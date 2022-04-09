import random

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.db import transaction
from django.db.utils import IntegrityError

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus

planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']


def init_users():
    new_users = [
        User(
            username="user" + c,
            password=make_password("password" + c),
            email="user" + c + "@gmail.com",
            first_name="User",
            last_name=c.upper(),
            is_active=True,
        ) for c in "abcdefgh"
    ]
    for user in new_users:
        user.save()
    return new_users[:4]


def init_workspaces():
    new_workspaces = [
        Workspace(
            name="Workspace-" + str(i),
            description="This is the workspace description",
        ) for i in range(1, 3)
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
            name="Project-" + workspace.name[-1] + str(i),
            description="This is the project description",
            workspace=workspace,
            owner=random.choice(users),
        ) for workspace in workspaces
        for i in range(1, 4)
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
            title=random.choice(planets) + " Job " + str(i),
            description="This is the task description",
            project=project,
            assignee=random.choice(users),
            reporter=random.choice(users),
        ) for project in projects
        for i in range(1, random.randint(1, 20) + 1)
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
