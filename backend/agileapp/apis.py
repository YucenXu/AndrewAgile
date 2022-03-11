import json

from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods

from backend.utils import check_login_status


@ensure_csrf_cookie
# args and kwargs must be included to fit all requests
def home_view(request, *args, **kwargs):
    return render(request, "index.html")


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
