from django.urls import path
from agileapp import apis

urlpatterns = [
    path('tasks', apis.tasks_api),
]
