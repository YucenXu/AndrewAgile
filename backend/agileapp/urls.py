from django.urls import path
from agileapp import apis

urlpatterns = [
    path('logout', apis.logout_api),
    path('userinfo', apis.user_info),
    path('users', apis.all_users),
    path('user/<str:uid>', apis.user_api),
    path('workspaces', apis.all_workspaces),
    path('workspace/<int:wid>', apis.workspace_api),
    path('workspace/<int:wid>/projects', apis.workspace_projects),
    path('project/<int:pid>', apis.project_api),
    path('project/<int:pid>/tasks', apis.project_tasks),
    path('task/<int:tid>', apis.task_api),
    path('task/<int:tid>/comments', apis.task_comments),
    path('comment/<int:cid>', apis.comment_api),
]
