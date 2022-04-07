import random

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.db import transaction
from django.db.utils import IntegrityError

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus


def init_users():
    new_users = [
        User(
            username="testuser-" + str(i),
            password=make_password("testuser-" + str(i)),
            email="testuser-" + str(i) + "@gmail.com",
            first_name="Firstname-" + str(i),
            last_name="Lastname-" + str(i),
            is_active=True,
        ) for i in range(1, 9)
    ]
    for user in new_users:
        user.save()
    return new_users[:4]


def init_workspaces():
    new_workspaces = [
        Workspace(
            name="Workspace-" + c,
            description="This is the workspace description",
        ) for c in "AB"
    ]
    for workspace in new_workspaces:
        workspace.save()
    return new_workspaces


def init_permissions():
    new_perms = [
        Permission(
            workspace=workspace,
            user=user,
            role=random.choice([UserRole.ADMIN, UserRole.EDITOR]),
        ) for workspace in workspaces
        for user in users
    ]
    for perm in new_perms:
        perm.save()
    return new_perms


def init_projects():
    new_projects = [
        Project(
            name="Project-" + workspace.name[-1] + c,
            description="This is the project description",
            workspace=workspace,
            owner=random.choice(users),
        ) for workspace in workspaces
        for c in "ABC"
    ]
    for project in new_projects:
        project.save()
    return new_projects


def init_tasks():
    new_tasks = [
        Task(
            type=random.choice(TaskType.choices)[0],
            priority=random.choice(TaskPriority.choices)[0],
            status=random.choice(TaskStatus.choices)[0],
            title="Task-" + project.name[-2:] + chr(65 + i),
            description="This is the task description",
            project=project,
            assignee=random.choice(users),
            reporter=random.choice(users),
        ) for project in projects
        for i in range(random.randint(0, 20))
    ]
    for task in new_tasks:
        task.save()
    return new_tasks


def init_comments():
    new_comments = [
        Comment(
            content="This is the task comment",
            task=task,
            user=random.choice(users),
        ) for task in tasks
        for _ in range(random.randint(0, 3))
    ]
    for comment in new_comments:
        comment.save()
    return new_comments


# populate database with dummy data
try:
    with transaction.atomic():
        users = init_users()
        workspaces = init_workspaces()
        perms = init_permissions()
        projects = init_projects()
        tasks = init_tasks()
        comments = init_comments()
    print("=== Init Database Successful ===")
    exit(0)
except IntegrityError as e:
    print("=== Init Database Failed: already initialized ===")
    exit(1)
