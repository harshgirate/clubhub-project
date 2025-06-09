from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('user_type', 'ADMIN')
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    USER_TYPES = (
        ('STUDENT', 'Student'),
        ('ADMIN', 'Admin'),
        ('EVENT_ADMIN', 'Event Administrator'),
    )

    username = None
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='STUDENT')
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'user_type']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Club(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField()
    category = models.CharField(max_length=100)
    meeting_time = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    members = models.ManyToManyField(User, related_name='clubs_joined', blank=True)
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='clubs_managed')

    def __str__(self):
        return self.name 

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='events')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    attendees = models.ManyToManyField(User, related_name='events_attending', blank=True)

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) 