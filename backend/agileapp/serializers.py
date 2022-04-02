from abc import abstractmethod, abstractproperty
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from userapp.serializers import UserSerializer
from agileapp.models import EmptyModel, Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus


class MutableModelSerializer(serializers.ModelSerializer):
    @abstractproperty
    class Meta:
        model = EmptyModel
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

        for field_name, field_type, is_required in field_list:
            if field_name not in data and is_required:
                errors[field_name] = "This field is required."
            elif field_name in data:
                if isinstance(field_type, models.enums.ChoicesMeta):
                    try:
                        data[field_name] = getattr(field_type, str(data[field_name]).upper())
                    except AttributeError:
                        pass
                if not isinstance(data[field_name], field_type):
                    errors[field_name] = "This field should be %s type." % field_type.__name__

        return errors

    @classmethod
    def _validate_foreign_key(cls, fk_obj, fk_name, data, errors):
        if fk_obj:
            del data[fk_name + 'Id']
            data[fk_name] = fk_obj[0]
        else:
            errors[fk_name + 'Id'] = "Object with this ID does not exist."

    @abstractmethod
    def _validate_create(self, data):
        raise NotImplementedError("function _validate_create is required")

    @abstractmethod
    def _validate_update(self, data):
        raise NotImplementedError("function _validate_update is required")

    def save(self):
        if 'id' in self._validated_data:
            self._instance = self.Meta.model.objects.filter(id=self._validated_data['id'])[0]
            for key, value in self._validated_data.items():
                setattr(self._instance, key, value)
            setattr(self._instance, "last_updated_at", timezone.now())
        else:
            self._instance = self.Meta.model(**self._validated_data)
        self._instance.save()
        return self._instance


class WorkspaceSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source='created_at')
    lastUpdatedAt = serializers.DateTimeField(source='last_updated_at')

    class Meta:
        model = Workspace
        fields = ['id', 'name', 'description', 'createdAt', 'lastUpdatedAt']


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
            ('name', str, True),
            ('description', str, False),
            ('workspaceId', int, True),
            ('owner', User, True),
        ], data)

        workspace = Workspace.objects.filter(id=data['workspaceId'])
        self._validate_foreign_key(workspace, 'workspace', data, errors)

        return self._validation_result(data, errors)

    def _validate_update(self, data):
        errors = self._validate_fields([
            ('id', int, True),
            ('name', str, False),
            ('description', str, False),
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
            ('type', TaskType, True),
            ('priority', TaskPriority, False),
            ('status', TaskStatus, False),
            ('title', str, True),
            ('description', str, False),
            ('projectId', int, True),
            ('assigneeId', str, True),
            ('reporterId', str, True),
        ], data)

        project = Project.objects.filter(id=data['projectId'])
        self._validate_foreign_key(project, 'project', data, errors)

        if 'assigneeId' in data and isinstance(data['assigneeId'], str):
            assignee = User.objects.filter(username=data['assigneeId'])
            self._validate_foreign_key(assignee, 'assignee', data, errors)

        if 'reporterId' in data and isinstance(data['reporterId'], str):
            reporter = User.objects.filter(username=data['reporterId'])
            self._validate_foreign_key(reporter, 'reporter', data, errors)

        return self._validation_result(data, errors)

    def _validate_update(self, data):
        errors = self._validate_fields([
            ('id', int, True),
            ('type', TaskType, False),
            ('priority', TaskPriority, False),
            ('status', TaskStatus, False),
            ('title', str, False),
            ('description', str, False),
            ('assigneeId', str, False),
            ('reporterId', str, False),
        ], data)

        if not Task.objects.filter(id=data['id']):
            errors['taskId'] = "Object with this ID does not exist."

        if 'assigneeId' in data and isinstance(data['assigneeId'], str):
            assignee = User.objects.filter(username=data['assigneeId'])
            self._validate_foreign_key(assignee, 'assignee', data, errors)

        if 'reporterId' in data and isinstance(data['reporterId'], str):
            reporter = User.objects.filter(username=data['reporterId'])
            self._validate_foreign_key(reporter, 'reporter', data, errors)

        return self._validation_result(data, errors)


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
            ('taskId', int, True),
            ('user', User, True),
            ('content', str, True),
        ], data)

        task = Task.objects.filter(id=data['taskId'])
        self._validate_foreign_key(task, 'task', data, errors)

        return self._validation_result(data, errors)

    def _validate_update(self, data):
        # comments are not allowed to update
        pass


class TaskDetailSerializer(TaskSerializer):
    project = ProjectSerializer()
    assignee = UserSerializer()
    reporter = UserSerializer()
    comments = CommentSerializer(source='comment_set', many=True)

    class Meta:
        model = Task
        fields = [
            'id', 'type', 'priority', 'status', 'title', 'description',
            'project', 'assignee', 'reporter', 'createdAt', 'lastUpdatedAt',
            'comments',
        ]
