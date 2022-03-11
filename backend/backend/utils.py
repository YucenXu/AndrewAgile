from django.http import HttpResponse


# a self-defined decorator on all APIs that require user login
def check_login_status(api_func):
    def wrapper_func(request, *args, **kwargs):
        exempt_paths = ("/api/userinfo", "/api/login", "/api/logout", "/api/register")
        if not request.user.is_authenticated and request.path not in exempt_paths:
            return HttpResponse(status=401)
        else:
            return api_func(request, *args, **kwargs)

    return wrapper_func
