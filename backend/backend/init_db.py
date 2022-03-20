import random

from django.contrib.auth.models import User
from django.db.utils import IntegrityError

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus

users = []
workspaces = []
projects = []
tasks = []


def init_users():
    for c in "ABCDEFG":
        user = User.objects.create_user(
            username="user" + c,
            password="123456",
            email="user" + c.lower() + "@gmail.com",
            first_name=c + "first",
            last_name=c + "last",
        )
        user.save()
        users.append(user)


def init_workspaces():
    for name in ("Default", "DevOps"):
        workspace = Workspace(
            name=name,
            description="This is the workspace for " + name,
        )
        workspace.save()
        workspaces.append(workspace)


def init_permissions():
    for workspace in workspaces:
        for user in users:
            perm = Permission(
                workspace=workspace,
                user=user,
                role=random.choice(UserRole.choices)[0],
            )
            perm.save()


def init_projects():
    for workspace in workspaces:
        for c in "ABC":
            project = Project(
                name="Project-" + c,
                description="This is the project description",
                workspace=workspace,
                owner=random.choice(users),
            )
            project.save()
            projects.append(project)


def init_tasks():
    for project in projects:
        for i in range(random.randint(1, 20)):
            task = Task(
                type=random.choice(TaskType.choices)[0],
                priority=random.choice(TaskPriority.choices)[0],
                status=random.choice(TaskStatus.choices)[0],
                title="Task-" + str(i),
                description="This is the task description",
                project=project,
                assignee=random.choice(users),
                reporter=random.choice(users),
            )
            task.save()
            tasks.append(task)


def init_comments():
    for task in tasks:
        for i in range(random.randint(0, 3)):
            comment = Comment(
                content="This is a task comment",
                task=task,
                user=random.choice(users),
            )
            comment.save()


# populate database with dummy data
try:
    init_users()
    init_workspaces()
    init_permissions()
    init_projects()
    init_tasks()
    init_comments()
    print("=== Init Database Successful! ===")
    exit(0)
except IntegrityError as e:
    print("=== Init Database Failed: already initialized ===")
    exit(1)
