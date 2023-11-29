from django.db import models

# Create your models here.

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    # You can add more fields like description, parent category (if it's a hierarchical structure), etc.

    def __str__(self):
        return self.name





class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    # Other fields like image, availability, etc., can be added here.

    def __str__(self):
        return self.name
    
class Order(models.Model):
    order_number = models.AutoField(primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)
    # Add other fields related to an order

    def __str__(self):
        return f"Order {self.order_number}"

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE,default=1)
    product_name = models.CharField(max_length=255)
    amount = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    # Add other fields related to order details

    def __str__(self):
        return f"{self.product_name} - {self.amount} units"