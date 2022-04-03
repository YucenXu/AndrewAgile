# a backdoor middleware to automatically grant full access to admin site for developers
class DeveloperAccountMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

        self._developer_list = (
            "nianyig@andrew.cmu.edu",
            "yucenx@andrew.cmu.edu",
            "zhiqili@andrew.cmu.edu",
            "pzhao2@andrew.cmu.edu",
        )

    def __call__(self, request):
        user = request.user

        if user.is_authenticated and user.email in self._developer_list and not user.is_staff:
            # user can log into admin site
            user.is_staff = True
            # user has all permissions without explicitly assigning them
            user.is_superuser = True
            user.save()

        return self.get_response(request)
