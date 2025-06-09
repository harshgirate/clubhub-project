from django.core.management.base import BaseCommand
from clubs.models import User, Club, Event
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Creates test data for the application'

    def handle(self, *args, **kwargs):
        # Create test users
        admin = User.objects.create_user(
            email='admin@test.com',
            password='admin123',
            first_name='Admin',
            last_name='User',
            user_type='ADMIN'
        )

        event_admin = User.objects.create_user(
            email='eventadmin@test.com',
            password='event123',
            first_name='Event',
            last_name='Admin',
            user_type='EVENT_ADMIN'
        )

        student = User.objects.create_user(
            email='student@test.com',
            password='student123',
            first_name='Student',
            last_name='User',
            user_type='STUDENT'
        )

        # Create test clubs
        clubs = [
            Club.objects.create(
                name="Amogh Club",
                description="Photography club for enthusiasts",
                category="Photography",
                meeting_time="Every Saturday, 3:00 PM",
                location="Media Center",
                email="amogh@club.com",
                admin=admin
            ),
            Club.objects.create(
                name="Natraj Club",
                description="Dance club for all styles",
                category="Dance",
                meeting_time="Tuesday & Thursday, 5:00 PM",
                location="Dance Studio",
                email="natraj@club.com",
                admin=admin
            ),
            Club.objects.create(
                name="Ameya Club",
                description="Gaming and esports club",
                category="Gaming",
                meeting_time="Friday, 4:00 PM",
                location="Gaming Arena",
                email="ameya@club.com",
                admin=admin
            )
        ]

        # Create test events
        for club in clubs:
            Event.objects.create(
                title=f"{club.name} Workshop",
                description=f"Introductory workshop for {club.name}",
                date=timezone.now() + timedelta(days=7),
                location=club.location,
                club=club,
                created_by=event_admin
            )

        self.stdout.write(self.style.SUCCESS('Successfully created test data')) 