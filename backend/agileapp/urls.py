from django.urls import path
from agileapp import apis

urlpatterns = [
    # user apis
    path('logout', apis.logout_api),
    path('userinfo', apis.user_info),

    # workspace apis
    path('workspaces', apis.all_workspaces),
    path('workspace/<int:wid>', apis.workspace_api),

    # permission apis
    path('userscope', apis.user_scope),
    path('workspace/<int:wid>/users', apis.workspace_users),

    # project apis
    path('workspace/<int:wid>/projects', apis.workspace_projects),
    path('project/<int:pid>', apis.project_api),

    # task apis
    path('project/<int:pid>/tasks', apis.project_tasks),
    path('task/<int:tid>', apis.task_api),

    # comment apis
    path('task/<int:tid>/comments', apis.task_comments),
    path('comment/<int:cid>', apis.comment_api),

    # notification apis
    path('task/<int:tid>/watchers', apis.watcher_api),
    path('messages', apis.message_api),
]
