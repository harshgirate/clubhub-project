from rest_framework import serializers
from .models import Club, User, Event
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'password2', 'first_name', 'last_name', 'user_type')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('password2'):
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            user_type=validated_data.get('user_type', 'STUDENT')
        )
        return user

class ClubSerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = '__all__'

    def get_member_count(self, obj):
        return obj.members.count()

class EventSerializer(serializers.ModelSerializer):
    attendee_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_attendee_count(self, obj):
        return obj.attendees.count() 