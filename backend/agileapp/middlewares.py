import re
from django.http import HttpResponse

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

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.method in ("POST", "PUT", "DELETE"):
            workspace_id = self._parse_workspace_id(view_kwargs)
            if workspace_id and request.user.is_authenticated:
                perm = Permission.objects.filter(workspace__id=workspace_id, user=request.user)
                if not perm:
                    # only editors and admins can modify database models
                    return HttpResponse(status=403)
                elif self._perm_url_pattern.match(request.path) and perm[0].role != UserRole.ADMIN:
                    # only admins are allowed to grant new permissions
                    return HttpResponse(status=403)

        # continue to call view functions
        return None

    def _parse_workspace_id(self, view_kwargs):
        wid = None

        if 'wid' in view_kwargs:
            workspace = Workspace.objects.filter(id=view_kwargs['wid'])
            if workspace:
                wid = workspace[0].id
        elif 'pid' in view_kwargs:
            project = Project.objects.filter(id=view_kwargs['pid'])
            if project:
                wid = project[0].workspace.id
        elif 'tid' in view_kwargs:
            task = Task.objects.filter(id=view_kwargs['tid'])
            if task:
                wid = task[0].project.workspace.id
        elif 'cid' in view_kwargs:
            comment = Comment.objects.filter(id=view_kwargs['cid'])
            if comment:
                wid = comment[0].task.project.workspace.id

        return wid
