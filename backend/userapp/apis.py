from django.contrib.auth import logout
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from userapp.serializers import UserSerializer


@require_POST
def logout_api(request):
    logout(request)
    return HttpResponse(status=200)


# ensure frontend has csrftoken in local dev
@ensure_csrf_cookie
@require_GET
def user_info(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return JsonResponse(serializer.data)
    else:
        return HttpResponse(status=401)


@login_required
@require_GET
def all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


@login_required
@require_GET
def user_api(request, uid):
    user = User.objects.filter(username=uid)
    if user:
        serializer = UserSerializer(user[0])
        return JsonResponse(serializer.data)
    else:
        return HttpResponse(status=404)
