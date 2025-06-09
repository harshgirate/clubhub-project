from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Club, Event

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'user_type', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    list_filter = ('user_type', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'user_type')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'user_type'),
        }),
    )

@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'email', 'created_at')
    search_fields = ('name', 'description', 'category')
    list_filter = ('category', 'created_at')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'date', 'location')
    search_fields = ('title', 'description', 'location')
    list_filter = ('date', 'club') 