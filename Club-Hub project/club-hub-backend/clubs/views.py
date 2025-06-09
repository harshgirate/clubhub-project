from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Club, User, Event
from .serializers import ClubSerializer, UserSerializer, EventSerializer
from .permissions import IsEventAdmin, IsAdmin, IsStudent

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        
        # Add additional user info to response
        data.update({
            'user_id': user.id,
            'email': user.email,
            'user_type': user.user_type,
            'first_name': user.first_name,
            'last_name': user.last_name
        })
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    data = request.data.copy()
    
    # Ensure password confirmation is present
    if 'password2' not in data:
        return Response({
            'error': 'Password confirmation is required',
            'message': 'Please confirm your password'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if passwords match
    if data['password'] != data['password2']:
        return Response({
            'error': 'Passwords do not match',
            'message': 'Please make sure your passwords match'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Create serializer with data
    serializer = UserSerializer(data=data)
    
    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response({
                'message': 'User created successfully',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'user_type': user.user_type,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'error': str(e),
                'message': 'Registration failed'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        'error': serializer.errors,
        'message': 'Validation failed'
    }, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdmin()]
        return [permissions.IsAuthenticated()]

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        club = self.get_object()
        user = request.user
        if IsStudent().has_permission(request, self):
            club.members.add(user)
            return Response({'status': 'joined club'})
        return Response({'error': 'unauthorized'}, status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        club = self.get_object()
        user = request.user
        if user in club.members.all():
            club.members.remove(user)
            return Response({'status': 'left club'})
        return Response({'error': 'not a member'}, status=status.HTTP_400_BAD_REQUEST)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsEventAdmin()]
        return [permissions.IsAuthenticated()]

    @action(detail=True, methods=['post'])
    def register(self, request, pk=None):
        event = self.get_object()
        user = request.user
        if user not in event.attendees.all():
            event.attendees.add(user)
            return Response({'status': 'registered for event'})
        return Response({'error': 'already registered'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def unregister(self, request, pk=None):
        event = self.get_object()
        user = request.user
        if user in event.attendees.all():
            event.attendees.remove(user)
            return Response({'status': 'unregistered from event'})
        return Response({'error': 'not registered'}, status=status.HTTP_400_BAD_REQUEST)