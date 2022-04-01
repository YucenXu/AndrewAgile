from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# an empty model for abstract class MutableModelSerializer
class EmptyModel(models.Model):
    pass


class Workspace(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=300)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "Workspace: name=%s" % self.name


class UserRole(models.TextChoices):
    ADMIN = 'admin'
    VIEWER = 'viewer'
    EDITOR = 'editor'


class Permission(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(choices=UserRole.choices, max_length=6)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "Permission: workspace=%s, user=%s, role=%s" % (
            self.workspace.name, self.user, self.role,
        )


class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "Project: name=%s, workspace=%s, owner=%s" % (
            self.name, self.workspace.name, self.owner,
        )


class TaskType(models.TextChoices):
    STORY = 'story'
    ISSUE = 'issue'
    ACTION = 'action'


class TaskPriority(models.TextChoices):
    CRITICAL = 'critical'
    IMPORTANT = 'important'
    NORMAL = 'normal'
    LOW = 'low'


class TaskStatus(models.TextChoices):
    BACKLOG = 'backlog'
    TODO = 'todo'
    INPROGRESS = 'inprogress'
    DONE = 'done'


class Task(models.Model):
    type = models.CharField(choices=TaskType.choices, max_length=6)
    priority = models.CharField(choices=TaskPriority.choices, default=TaskPriority.NORMAL, max_length=9)
    status = models.CharField(choices=TaskStatus.choices, default=TaskStatus.BACKLOG, max_length=10)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assignee')
    reporter = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='reporter')
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "Task: title=%s, project=%s, type=%s" % (
            self.title, self.project.name, self.type,
        )


class Comment(models.Model):
    content = models.TextField(max_length=300)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "Comment: task=%s, user=%s" % (self.task.title, self.user)
