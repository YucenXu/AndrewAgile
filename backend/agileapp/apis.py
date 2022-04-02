from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods, require_GET, require_POST
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus

from agileapp.serializers import WorkspaceSerializer, ProjectSerializer, TaskSerializer, CommentSerializer, \
    TaskDetailSerializer


@login_required
@ensure_csrf_cookie
# args and kwargs must be included to fit all requests
def home_view(request, *args, **kwargs):
    return render(request, "index.html")


@login_required
@require_GET
def all_workspaces(request):
    workspaces = Workspace.objects.all()
    serializer = WorkspaceSerializer(workspaces, many=True)
    return JsonResponse(serializer.data, safe=False)


@login_required
@require_GET
def workspace_api(request, wid):
    workspace = Workspace.objects.filter(id=wid)
    if workspace:
        serializer = WorkspaceSerializer(workspace[0])
        return JsonResponse(serializer.data)
    else:
        return HttpResponse(status=404)


@login_required
@require_http_methods(["GET", "POST"])
def workspace_projects(request, wid):
    if request.method == "GET":
        projects = Project.objects.filter(workspace__id=wid)
        serializer = ProjectSerializer(projects, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        data = JSONParser().parse(request)
        data['workspaceId'] = wid
        data['owner'] = request.user
        serializer = ProjectSerializer(data=data)
        if serializer.validate(method='POST'):
            serializer = ProjectSerializer(serializer.save())
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)


@login_required
@require_http_methods(["GET", "PUT", "DELETE"])
def project_api(request, pid):
    if request.method == "GET":
        project = Project.objects.filter(id=pid)
        if project:
            serializer = ProjectSerializer(project[0])
            return JsonResponse(serializer.data)
        else:
            return HttpResponse(status=404)
    elif request.method == "PUT":
        data = JSONParser().parse(request)
        data['id'] = pid
        serializer = ProjectSerializer(data=data)
        if serializer.validate(method='PUT'):
            serializer = ProjectSerializer(serializer.save())
            return JsonResponse(serializer.data, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    elif request.method == "DELETE":
        project = Project.objects.filter(id=pid)
        if project:
            project[0].delete()
        return HttpResponse(status=200)


@login_required
@require_http_methods(["GET", "POST"])
def project_tasks(request, pid):
    if request.method == "GET":
        tasks = Task.objects.filter(project__id=pid)
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        data = JSONParser().parse(request)
        data['projectId'] = pid
        serializer = TaskSerializer(data=data)
        if serializer.validate(method='POST'):
            serializer = TaskSerializer(serializer.save())
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)


@login_required
@require_http_methods(["GET", "PUT", "DELETE"])
def task_api(request, tid):
    if request.method == "GET":
        task = Task.objects.filter(id=tid)
        if task:
            serializer = TaskDetailSerializer(task[0])
            return JsonResponse(serializer.data)
        else:
            return HttpResponse(status=404)
    elif request.method == "PUT":
        data = JSONParser().parse(request)
        data['id'] = tid
        serializer = TaskSerializer(data=data)
        if serializer.validate(method='PUT'):
            serializer = TaskSerializer(serializer.save())
            return JsonResponse(serializer.data, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    elif request.method == "DELETE":
        task = Task.objects.filter(id=tid)
        if task:
            task[0].delete()
        return HttpResponse(status=200)


@login_required
@require_POST
def task_comments(request, tid):
    data = JSONParser().parse(request)
    data['taskId'] = tid
    data['user'] = request.user
    serializer = CommentSerializer(data=data)
    if serializer.validate(method='POST'):
        serializer = CommentSerializer(serializer.save())
        return JsonResponse(serializer.data, status=201)
    else:
        return JsonResponse(serializer.errors, status=400)
