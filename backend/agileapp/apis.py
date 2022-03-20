import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods, require_GET

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus


@ensure_csrf_cookie
# args and kwargs must be included to fit all requests
def home_view(request, *args, **kwargs):
    return render(request, "index.html")


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


@require_http_methods(["GET", "POST"])
def workspace_projects(request, wid):
    if request.method == "GET":
        projects = Project.objects.filter(workspace__id=wid)
        resp = [
            {
                "id": project.id,
                "name": project.name,
                "description": project.description,
                "workspace_id": project.workspace.id,
                "owner": project.owner.username,
            }
            for project in projects
        ]
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        pass


@require_http_methods(["GET", "PUT", "DELETE"])
def project_api(request, pid):
    pass


@require_http_methods(["GET", "POST"])
def project_tasks(request, pid):
    pass


@require_http_methods(["GET", "PUT", "DELETE"])
def task_api(request, tid):
    pass
