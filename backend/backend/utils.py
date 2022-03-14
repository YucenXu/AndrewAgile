from django.http import HttpResponse


# a self-defined middleware on all APIs that require user login
class LoginStatusMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.exempt_paths = ("/api/userinfo", "/api/login", "/api/logout", "/api/register")

    def __call__(self, request):
        if not request.user.is_authenticated and self._is_protected_api(request.path):
            return HttpResponse(status=401)
        else:
            return self.get_response(request)

    def _is_protected_api(self, path):
        return path.startswith("/api") and path not in self.exempt_paths
