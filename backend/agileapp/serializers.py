from abc import abstractmethod, abstractproperty
from django.contrib.auth.models import User
from django.db import models, transaction
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus
from agileapp.messenger import TaskMessenger


class MutableModelSerializer(serializers.ModelSerializer):
    @abstractproperty
    class Meta:
        model = None
        fields = []

    def validate(self, method):
        try:
            if method == "POST":
                self._validated_data = self._validate_create(self.initial_data)
            elif method == "PUT":
                self._validated_data = self._validate_update(self.initial_data)
        except ValidationError as exc:
            self._validated_data = {}
            self._errors = exc.detail
        else:
            self._errors = {}

        return not bool(self._errors)

    @classmethod
    def _validation_result(cls, data, errors):
        if errors:
            raise ValidationError(errors)
        else:
            return data

    @classmethod
    def _validate_fields(cls, field_list, data):
        errors = {}

        unk_fields = data.keys() - set([field[0] for field in field_list])
        for field in unk_fields:
            del data[field]

        for field_name, field_type, is_required, nullable in field_list:
            if field_name not in data and is_required:
                errors[field_name] = "This field is required."
            elif field_name in data:
                # try convert enum type
                if isinstance(field_type, models.enums.ChoicesMeta):
                    choices = [choice[0] for choice in field_type.choices]
                    if str(data[field_name]).lower() in choices:
                        data[field_name] = getattr(field_type, data[field_name].upper())
                # check field type
                if not isinstance(data[field_name], field_type):
                    errors[field_name] = "This field should be %s type." % field_type.__name__
                # strip string field and check if blank
                elif field_type == str:
                    data[field_name] = data[field_name].strip()
                    if not nullable and not data[field_name]:
                        errors[field_name] = "This string field cannot be blank."

        return errors

    @classmethod
    def _validate_foreign_key(cls, fk_obj, fk_name, data, errors):
        if fk_obj:
            del data[fk_name + 'Id']
            data[fk_name] = fk_obj
        else:
            errors[fk_name + 'Id'] = "Object with this ID does not exist."

    @abstractmethod
    def _validate_create(self, data):
        raise NotImplementedError("function _validate_create is required")

    @abstractmethod
    def _validate_update(self, data):
        raise NotImplementedError("function _validate_update is required")

    def save(self, **kwargs):
        if 'id' in self._validated_data:
            self._instance = self.Meta.model.objects.get(id=self._validated_data['id'])
            for key, value in self._validated_data.items():
                setattr(self._instance, key, value)
            if len(self._validated_data) > 1 and "last_updated_at" in self._instance.__dict__:
                setattr(self._instance, "last_updated_at", timezone.now())
        else:
            self._instance = self.Meta.model(**self._validated_data)
        self._instance.save()
        return self._instance


class UserSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(source='first_name')
    lastname = serializers.CharField(source='last_name')
    dateJoined = serializers.DateTimeField(source='date_joined')

    class Meta:
        model = User
        fields = ['username', 'email', 'firstname', 'lastname', 'dateJoined']


class WorkspaceSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source='created_at')
    lastUpdatedAt = serializers.DateTimeField(source='last_updated_at')

    class Meta:
        model = Workspace
        fields = ['id', 'name', 'description', 'createdAt', 'lastUpdatedAt']


class PermissionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    firstname = serializers.CharField(source='user.first_name')
    lastname = serializers.CharField(source='user.last_name')
    dateJoined = serializers.DateTimeField(source='user.date_joined')

    class Meta:
        model = Permission
        fields = ['role', 'username', 'email', 'firstname', 'lastname', 'dateJoined']


class ProjectSerializer(MutableModelSerializer):
    workspaceId = serializers.IntegerField(source='workspace.id')
    owner = UserSerializer()
    createdAt = serializers.DateTimeField(source='created_at')
    lastUpdatedAt = serializers.DateTimeField(source='last_updated_at')

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'workspaceId', 'owner', 'createdAt', 'lastUpdatedAt']

    def _validate_create(self, data):
        errors = self._validate_fields([
            ('name', str, True, False),
            ('description', str, False, True),
            ('workspaceId', int, True, None),
            ('owner', User, True, None),
        ], data)

        workspace = Workspace.objects.filter(id=data['workspaceId']).first()
        self._validate_foreign_key(workspace, 'workspace', data, errors)

        return self._validation_result(data, errors)

    def _validate_update(self, data):
        errors = self._validate_fields([
            ('id', int, True, None),
            ('name', str, False, False),
            ('description', str, False, True),
        ], data)

        if not Project.objects.filter(id=data['id']):
            errors['projectId'] = "Object with this ID does not exist."

        return self._validation_result(data, errors)


class TaskSerializer(MutableModelSerializer):
    projectId = serializers.IntegerField(source='project.id')
    assigneeId = serializers.CharField(source='assignee.username')
    reporterId = serializers.CharField(source='reporter.username')
    createdAt = serializers.DateTimeField(source='created_at')
    lastUpdatedAt = serializers.DateTimeField(source='last_updated_at')

    class Meta:
        model = Task
        fields = [
            'id', 'type', 'priority', 'status', 'title', 'description',
            'projectId', 'assigneeId', 'reporterId', 'createdAt', 'lastUpdatedAt'
        ]

    def _validate_create(self, data):
        errors = self._validate_fields([
            ('type', TaskType, True, None),
            ('priority', TaskPriority, False, None),
            ('status', TaskStatus, False, None),
            ('title', str, True, False),
            ('description', str, False, True),
            ('projectId', int, True, None),
            ('assigneeId', str, True, False),
            ('reporterId', str, True, False),
        ], data)

        project = Project.objects.filter(id=data['projectId']).first()
        self._validate_foreign_key(project, 'project', data, errors)

        if 'assigneeId' in data and isinstance(data['assigneeId'], str):
            assignee = User.objects.filter(username=data['assigneeId']).first()
            self._validate_foreign_key(assignee, 'assignee', data, errors)

        if 'reporterId' in data and isinstance(data['reporterId'], str):
            reporter = User.objects.filter(username=data['reporterId']).first()
            self._validate_foreign_key(reporter, 'reporter', data, errors)

        return self._validation_result(data, errors)

    def _validate_update(self, data):
        errors = self._validate_fields([
            ('id', int, True, None),
            ('type', TaskType, False, None),
            ('priority', TaskPriority, False, None),
            ('status', TaskStatus, False, None),
            ('title', str, False, False),
            ('description', str, False, True),
            ('assigneeId', str, False, False),
            ('reporterId', str, False, False),
        ], data)

        if not Task.objects.filter(id=data['id']):
            errors['taskId'] = "Object with this ID does not exist."

        if 'assigneeId' in data and isinstance(data['assigneeId'], str):
            assignee = User.objects.filter(username=data['assigneeId']).first()
            self._validate_foreign_key(assignee, 'assignee', data, errors)

        if 'reporterId' in data and isinstance(data['reporterId'], str):
            reporter = User.objects.filter(username=data['reporterId']).first()
            self._validate_foreign_key(reporter, 'reporter', data, errors)

        return self._validation_result(data, errors)

    def save(self, user):
        msg_type, changelist = TaskMessenger.gen_task_changelist(self._validated_data)

        with transaction.atomic():
            super(TaskSerializer, self).save()
            for watcher in ('assignee', 'reporter'):
                if watcher in self._validated_data:
                    self._instance.watchers.add(self._validated_data[watcher])

        TaskMessenger.send_task_msgs(msg_type, user, self._instance, changelist)
        return self._instance


class CommentSerializer(MutableModelSerializer):
    taskId = serializers.IntegerField(source='task.id')
    user = UserSerializer()
    createdAt = serializers.DateTimeField(source='created_at')
    lastUpdatedAt = serializers.DateTimeField(source='last_updated_at')

    class Meta:
        model = Comment
        fields = ['id', 'taskId', 'user', 'content', 'createdAt', 'lastUpdatedAt']

    def _validate_create(self, data):
        errors = self._validate_fields([
            ('taskId', int, True, None),
            ('user', User, True, None),
            ('content', str, True, False),
        ], data)

        task = Task.objects.filter(id=data['taskId']).first()
        self._validate_foreign_key(task, 'task', data, errors)

        return self._validation_result(data, errors)

    def _validate_update(self, data):
        errors = self._validate_fields([
            ('id', int, True, None),
            ('user', User, True, None),
            ('content', str, False, False),
        ], data)

        comment = Comment.objects.filter(id=data['id']).first()
        if not comment:
            errors['commentId'] = "Object with this ID does not exist."
        elif data['user'] != comment.user:
            errors['user'] = "Only the original commenter can edit."

        del data['user']
        return self._validation_result(data, errors)


class TaskDetailSerializer(TaskSerializer):
    project = ProjectSerializer()
    assignee = UserSerializer()
    reporter = UserSerializer()
    comments = serializers.SerializerMethodField()
    watchers = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            'id', 'type', 'priority', 'status', 'title', 'description',
            'project', 'assignee', 'reporter', 'createdAt', 'lastUpdatedAt',
            'comments', 'watchers',
        ]

    def get_comments(self, task):
        comments = task.comment_set.all().order_by('created_at')
        return CommentSerializer(comments, many=True).data

    def get_watchers(self, task):
        watchers = task.watchers.order_by('username')
        return list(watchers.values_list("username", flat=True))
