from django.contrib import admin
from agileapp.models import Workspace, Permission, Project, Task, Comment

admin.site.register(Workspace)
admin.site.register(Permission)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(Comment)
