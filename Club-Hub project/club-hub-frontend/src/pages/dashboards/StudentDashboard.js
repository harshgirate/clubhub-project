import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Grid, Card, CardContent, Typography, Button, Box, 
  Avatar, Chip, CircularProgress, Divider 
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../config/api';
import './Dashboard.css';

function StudentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [myClubs, setMyClubs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [stats, setStats] = useState({
    joinedClubs: 0,
    registeredEvents: 0,
    achievements: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // In production, replace with actual API calls
      const clubsResponse = await axios.get(`${API_ENDPOINTS.CLUBS}?member=${user.id}`);
      const eventsResponse = await axios.get(`${API_ENDPOINTS.EVENTS}?attendee=${user.id}`);
      
      setMyClubs(clubsResponse.data);
      setUpcomingEvents(eventsResponse.data);
      setStats({
        joinedClubs: clubsResponse.data.length,
        registeredEvents: eventsResponse.data.length,
        achievements: 5 // Replace with actual achievements count
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Student Dashboard">
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Student Dashboard" 
      subtitle={`Welcome back, ${user?.firstName || 'Student'}`}
    >
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { 
            title: 'Joined Clubs', 
            value: stats.joinedClubs, 
            icon: <GroupIcon />, 
            color: '#2196f3',
            description: 'Active club memberships'
          },
          { 
            title: 'Registered Events', 
            value: stats.registeredEvents, 
            icon: <EventIcon />, 
            color: '#4caf50',
            description: 'Upcoming events'
          },
          { 
            title: 'Achievements', 
            value: stats.achievements, 
            icon: <SchoolIcon />, 
            color: '#f44336',
            description: 'Earned badges'
          }
        ].map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="stat-card" sx={{ bgcolor: stat.color }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box className="stat-icon-wrapper">
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h3" color="white" className="stat-value">
                      {stat.value}
                    </Typography>
                    <Typography variant="subtitle1" color="white" opacity={0.9}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" color="white" opacity={0.7}>
                      {stat.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* My Clubs Section */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" className="section-title">
                    My Clubs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your active club memberships
                  </Typography>
                </Box>
                <Button 
                  component={Link} 
                  to="/clubs" 
                  endIcon={<ArrowForwardIcon />}
                  className="view-all-button"
                >
                  View All Clubs
                </Button>
              </Box>
              <Box className="clubs-list">
                {myClubs.map((club, index) => (
                  <Box key={club.id}>
                    <Box display="flex" gap={2} alignItems="center" py={2}>
                      <Avatar 
                        src={club.image} 
                        alt={club.name}
                        variant="rounded"
                        sx={{ width: 64, height: 64 }}
                        className="club-avatar"
                      />
                      <Box flex={1}>
                        <Typography variant="subtitle1" className="club-name">
                          {club.name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <TimeIcon fontSize="small" className="icon-muted" />
                          <Typography variant="body2" color="text.secondary">
                            Next Meeting: {club.meeting_time}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip 
                        label={club.category} 
                        size="small"
                        className={`category-chip ${club.category.toLowerCase().replace(' ', '-')}`}
                      />
                    </Box>
                    {index < myClubs.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events Section */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" className="section-title">
                    Upcoming Events
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Events you're registered for
                  </Typography>
                </Box>
                <Button 
                  component={Link} 
                  to="/events" 
                  endIcon={<ArrowForwardIcon />}
                  className="view-all-button"
                >
                  View All Events
                </Button>
              </Box>
              <Box className="events-list">
                {upcomingEvents.map((event, index) => (
                  <Box key={event.id}>
                    <Box py={2}>
                      <Typography variant="subtitle1" className="event-title">
                        {event.title}
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={1} mt={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarIcon fontSize="small" className="icon-muted" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(event.date).toLocaleDateString()} at {
                              new Date(event.date).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })
                            }
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocationIcon fontSize="small" className="icon-muted" />
                          <Typography variant="body2" color="text.secondary">
                            {event.location}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <GroupIcon fontSize="small" className="icon-muted" />
                          <Typography variant="body2" color="text.secondary">
                            Organized by {event.club}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {index < upcomingEvents.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default StudentDashboard;
