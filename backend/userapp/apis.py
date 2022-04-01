import json

from django.contrib.auth import logout
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.http import require_http_methods, require_GET
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


@require_POST
def logout_api(request):
    logout(request)
    return HttpResponse(status=200)


# ensure frontend has csrftoken in local dev
@ensure_csrf_cookie
@require_GET
def user_info(request):
    if request.user.is_authenticated:
        resp = {
            "username": request.user.username,
            "email": request.user.email,
            "firstname": request.user.first_name,
            "lastname": request.user.last_name,
        }
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        return HttpResponse(status=404)


@login_required
@require_http_methods(["GET", "PUT", "DELETE"])
def user_api(request, uid):
    if request.method == "GET":
        user = User.objects.filter(id=uid)[0]
        resp = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "firstname": user.first_name,
            "lastname": user.last_name,
        }
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        pass
