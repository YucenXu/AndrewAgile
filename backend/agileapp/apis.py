import json

from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods


@ensure_csrf_cookie
# args and kwargs must be included to fit all requests
def home_view(request, *args, **kwargs):
    return render(request, "index.html")


# a self-defined decorator on all APIs that require user login
def check_login_status(api_func):
    def wrapper_func(request, *args, **kwargs):
        exempt_paths = ("/api/userinfo", "/api/login", "/api/logout", "/api/register")
        if not request.user.is_authenticated and request.path not in exempt_paths:
            return HttpResponse(status=401)
        else:
            return api_func(request, *args, **kwargs)

    return wrapper_func


@check_login_status
@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def tasks_api(request):
    tasks = [
        {
            "id": i + 1,
            "title": "Task " + str(i + 1),
            "priority": i + 1,
            "assignee": "Worker " + c,
            "reporter": "Worker " + c,
            "createdAt": str(timezone.now()),
            "lastUpdatedAt": str(timezone.now()),
        } for i, c in enumerate("ABCDE")
    ]

    return HttpResponse(json.dumps(tasks), content_type="application/json")
