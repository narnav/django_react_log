
from django.urls import path
from . import views
# from .views import MyTokenObtainPairView

urlpatterns = [
    path('',views.index ),
    path('login',views.MyTokenObtainPairView.as_view() )
]
