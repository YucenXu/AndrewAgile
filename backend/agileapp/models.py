from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Workspace(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=300)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "id=%d, name=%s" % (self.id, self.name)


class UserRole(models.TextChoices):
    ADMIN = 'admin'
    EDITOR = 'editor'
    VIEWER = 'viewer'


class Permission(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    role = models.CharField(choices=UserRole.choices, max_length=6)
    granted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='granted_by')
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "workspace=%s, user=%s, role=%s" % (
            self.workspace.name, self.user, self.role,
        )


class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "id=%d, name=%s, workspace=%s" % (
            self.id, self.name, self.workspace.name,
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
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignee')
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reporter')
    watchers = models.ManyToManyField(User, related_name='watchers')
    visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "id=%d, title=%s, project=%s" % (
            self.id, self.title, self.project.name,
        )


class Comment(models.Model):
    content = models.TextField(max_length=300)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "id=%d, task=%s, user=%s" % (
            self.id, self.task.title, self.user,
        )
