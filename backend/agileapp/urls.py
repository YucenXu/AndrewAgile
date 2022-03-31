from django.urls import path
from agileapp import apis

urlpatterns = [
    path('workspaces', apis.all_workspaces),
    path('workspace/<int:wid>', apis.workspaces_api),
    path('workspace/<int:wid>/projects', apis.workspace_projects),
    path('project/<int:pid>', apis.project_api),
    path('project/<int:pid>/tasks', apis.project_tasks),
    path('task/<int:tid>', apis.task_api),
    # TODO: add comment api
]
