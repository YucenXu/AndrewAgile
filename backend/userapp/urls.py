from django.urls import path
from userapp import apis

urlpatterns = [
    path('register', apis.register_api),
    path('login', apis.login_api),
    path('logout', apis.logout_api),
    path('userinfo', apis.user_info),
]
