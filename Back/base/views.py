import json
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import serializers
from .models import Category, Order, OrderDetail, Product
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)


        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['waga'] = "baga"
        # ...


        return token

class OrederDetSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ('__all__')  # Add more fields as needed

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name',)  # Add more fields as needed

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'category',)  # Add more fields as needed





class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryProductListView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        products = Product.objects.filter(category=instance)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ('id', 'order', 'product_name', 'amount', 'price')

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'order_number', 'date_created', 'order_details')

def index(req):
    return Response('hello')

@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['userName'],
                email='waga@aa.com',
                password=request.data['pwd'],
            )
    user.is_active = True
    user.is_staff = True
    
    user.save()
    return Response("new user born")

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def checkOut(request):
    cart_data = json.loads(request.body)
    print(request.user)
    print(cart_data)
    ord= Order.objects.create()
    ord.save()
    print(ord.order_number)
    for x in cart_data:
        # x["order"]=ord.order_number
        serializer = OrderDetailSerializer(data=x)
        if serializer.is_valid():
            serializer.save()

        OrderDetail.objects.create()
        print(x)

    return Response('Done')

# class CartView(APIView):
#     def post(self, request):
#         serializer = CartItemSerializer(data=request.data, many=True)
#         if serializer.is_valid():
#             # Perform actions with the cart items
#             # You might want to store this in the session or a database
#             # For example:
#             cart_items = serializer.validated_data
#             # Process cart items here, e.g., store in session
#             request.session['cart_items'] = cart_items
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         cart_items = request.session.get('cart_items', [])
#         serializer = CartItemSerializer(cart_items, many=True)
#         return Response(serializer.data)