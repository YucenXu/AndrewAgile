import re
from django.http import JsonResponse

from agileapp.models import Workspace, Permission, Project, Task, Comment
from agileapp.models import UserRole, TaskType, TaskPriority, TaskStatus


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


class UserPermissionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self._perm_url_pattern = re.compile("^/api/workspace/[0-9]+/users$")
        self._watcher_url_pattern = re.compile("^/api/task/[0-9]+/watchers$")
        self._message_url = "/api/messages"

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, view_func, view_args, view_kwargs):
        # bypass permission check of notification APIs
        if self._watcher_url_pattern.match(request.path) or request.path == self._message_url:
            return None

        if request.method in ("POST", "PUT", "DELETE"):
            workspace_id = self._parse_workspace_id(view_kwargs)
            if workspace_id and request.user.is_authenticated:
                perm = Permission.objects.filter(workspace__id=workspace_id, user=request.user).first()
                if self._perm_url_pattern.match(request.path) and (not perm or perm.role != UserRole.ADMIN):
                    error = {"error": "Only admins can grant user permissions."}
                    return JsonResponse(error, status=403)
                elif not perm:
                    error = {"error": "Only admins and editors can modify backend data."}
                    return JsonResponse(error, status=403)

        # continue to call view functions
        return None

    def _parse_workspace_id(self, view_kwargs):
        wid = None
        if 'wid' in view_kwargs:
            workspace = Workspace.objects.filter(id=view_kwargs['wid']).first()
            if workspace:
                wid = workspace.id
        elif 'pid' in view_kwargs:
            project = Project.objects.filter(id=view_kwargs['pid']).first()
            if project:
                wid = project.workspace.id
        elif 'tid' in view_kwargs:
            task = Task.objects.filter(id=view_kwargs['tid']).first()
            if task:
                wid = task.project.workspace.id
        elif 'cid' in view_kwargs:
            comment = Comment.objects.filter(id=view_kwargs['cid']).first()
            if comment:
                wid = comment.task.project.workspace.id
        return wid
