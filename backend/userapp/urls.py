from django.urls import path
from userapp import apis

urlpatterns = [
    path('logout', apis.logout_api),
    path('userinfo', apis.user_info),
    path('user/<int:uid>', apis.user_api),
]
