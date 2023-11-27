
from django.urls import path
from . import views
# from .views import MyTokenObtainPairView

urlpatterns = [
    path('',views.index ),
    path('login',views.MyTokenObtainPairView.as_view() ),
    path('categories',views.CategoryListCreateView.as_view() ),
    path('products',views.ProductListCreateView.as_view() ),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('categories/<int:pk>/products/', views.CategoryProductListView.as_view()),
]
