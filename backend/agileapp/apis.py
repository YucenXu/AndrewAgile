import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods, require_GET
from django.contrib.auth.decorators import login_required

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus


@login_required
@ensure_csrf_cookie
# args and kwargs must be included to fit all requests
def home_view(request, *args, **kwargs):
    return render(request, "index.html")


@login_required
@require_GET
def all_workspaces(request):
    workspaces = Workspace.objects.all()
    resp = [
        {
            "id": workspace.id,
            "name": workspace.name,
            "description": workspace.description,
        }
        for workspace in workspaces
    ]
    return HttpResponse(json.dumps(resp), content_type="application/json")


@login_required
@require_GET
def workspaces_api(request, wid):
    if request.method == "GET":
        workspace = Workspace.objects.filter(id=wid)[0]
        resp = {
                "id": workspace.id,
                "name": workspace.name,
                "description": workspace.description,
            }
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        pass


@login_required
@require_http_methods(["GET", "POST"])
def workspace_projects(request, wid):
    if request.method == "GET":
        projects = Project.objects.filter(workspace__id=wid)
        resp = [
            {
                "id": project.id,
                "name": project.name,
                "description": project.description,
                "workspaceId": project.workspace.id,
                "owner": project.owner.username,
                "createdAt": str(project.created_at),
                "lastUpdatedAt": str(project.last_updated_at),
            }
            for project in projects
        ]
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        pass


@login_required
@require_http_methods(["GET", "PUT", "DELETE"])
def project_api(request, pid):
    if request.method == "GET":
        project = Project.objects.filter(id=pid)[0]
        resp = {
                "id": project.id,
                "name": project.name,
                "description": project.description,
                "workspaceId": project.workspace.id,
                "owner": project.owner.username,
                "createdAt": str(project.created_at),
                "lastUpdatedAt": str(project.last_updated_at),
            }
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        pass


@login_required
@require_http_methods(["GET", "POST"])
def project_tasks(request, pid):
    if request.method == "GET":
        tasks = Task.objects.filter(project__id=pid)
        resp = [
            {
                "id": task.id,
                "type": task.type,
                "priority": task.priority,
                "status": task.status,
                "title": task.title,
                "description": task.description,
                "project": task.project.id,
                "assignee": task.assignee.id,
                "reporter": task.reporter.id,
                "createdAt": str(task.created_at),
                "lastUpdatedAt": str(task.last_updated_at),
            }
            for task in tasks
        ]
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        pass


@login_required
@require_http_methods(["GET", "PUT", "DELETE"])
def task_api(request, tid):
    pass
