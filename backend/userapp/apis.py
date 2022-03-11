import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET


@require_POST
def register_api(request):
    req = json.loads(request.body)
    params = ["username", "password", "confirmPwd", "email", "firstname", "lastname"]
    for param in params:
        if param not in req:
            err = {"msg": "Missing required parameter: " + param}
            return HttpResponse(json.dumps(err), content_type="application/json", status=400)

    if req["password"] != req["confirmPwd"]:
        err = {"msg": "Passwords do not match."}
        return HttpResponse(json.dumps(err), content_type="application/json", status=400)

    if User.objects.filter(username=req["username"]):
        return HttpResponse(status=409)

    user = User.objects.create_user(
        username=req["username"],
        password=req["password"],
        email=req["email"],
        first_name=req["firstname"],
        last_name=req["lastname"],
    )
    user.save()

    user = authenticate(username=req["username"], password=req["password"])
    login(request, user)
    return redirect("/api/userinfo")


@require_POST
def login_api(request):
    req = json.loads(request.body)
    if "username" not in req or "password" not in req:
        return HttpResponse(status=400)

    username = req["username"]
    password = req["password"]
    user = authenticate(username=username, password=password)

    if not user:
        return HttpResponse(status=401)
    else:
        login(request, user)
        return redirect("/api/userinfo")


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
        return HttpResponse(status=401)
