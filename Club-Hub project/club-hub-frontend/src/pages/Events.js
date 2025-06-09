import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Card, CardContent, CardMedia, Typography, Button, 
  TextField, Chip, CircularProgress, Box, IconButton, Dialog, 
  DialogContent, Tabs, Tab, Badge, Alert
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Event as EventIcon, 
  LocationOn as LocationIcon,
  Group as GroupIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import axios from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import './Events.css';

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Photography Workshop 2024",
    description: "Join Amogh Club for an intensive photography workshop covering composition, lighting, and advanced camera techniques. Perfect for both beginners and experienced photographers!",
    date: "2024-02-20T14:00:00",
    location: "Media Center, Ground Floor",
    club: "Amogh Club",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
    registeredCount: 35,
    status: "upcoming",
    category: "Photography"
  },
  {
    id: 2,
    title: "Annual Dance Competition",
    description: "Natraj Club presents its annual dance competition featuring various dance forms including classical, contemporary, and folk. Show your talent and win exciting prizes!",
    date: "2024-02-25T17:00:00",
    location: "Main Auditorium",
    club: "Natraj Club",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    registeredCount: 50,
    status: "upcoming",
    category: "Dance"
  },
  {
    id: 3,
    title: "Gaming Tournament 2024",
    description: "Ameya Club hosts a multi-game tournament featuring popular esports titles. Compete with fellow gamers and win amazing prizes!",
    date: "2024-03-01T10:00:00",
    location: "Gaming Arena, Tech Block",
    club: "Ameya Club",
    image: "/images/image.png",
    registeredCount: 40,
    status: "upcoming",
    category: "Gaming"
  },
  {
    id: 4,
    title: "Photo Exhibition",
    description: "Witness the best photographs taken by our club members throughout the year. A celebration of creativity and visual storytelling.",
    date: "2024-03-10T11:00:00",
    location: "Art Gallery",
    club: "Amogh Club",
    image: "https://images.unsplash.com/photo-1533158388470-9a56699990c6",
    registeredCount: 25,
    status: "upcoming",
    category: "Photography"
  },
  {
    id: 5,
    title: "Dance Workshop Series",
    description: "Learn different dance styles from professional choreographers. A week-long workshop covering various dance forms.",
    date: "2024-03-15T16:00:00",
    location: "Dance Studio",
    club: "Natraj Club",
    image: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    registeredCount: 30,
    status: "upcoming",
    category: "Dance"
  },
  {
    id: 6,
    title: "Game Development Workshop",
    description: "Learn the basics of game development using Unity. Create your first game in this hands-on workshop!",
    date: "2024-03-20T09:00:00",
    location: "Computer Lab",
    club: "Ameya Club",
    image: "/images/image.png",
    registeredCount: 45,
    status: "upcoming",
    category: "Gaming"
  }
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [registrationStatus, setRegistrationStatus] = useState({});
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Simulate API call with sample data
      setTimeout(() => {
        setEvents(SAMPLE_EVENTS);
        const uniqueCategories = [...new Set(SAMPLE_EVENTS.map(event => event.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      }, 1000);
    } catch (error) {
      showNotification('Failed to fetch events', 'error');
      setLoading(false);
    }
  };

  const handleRegisterEvent = async (eventId) => {
    try {
      await axios.post(`${API_ENDPOINTS.EVENTS}${eventId}/register/`);
      setRegistrationStatus(prev => ({
        ...prev,
        [eventId]: { success: true, message: 'Successfully registered!' }
      }));
      fetchEvents();
    } catch (error) {
      setRegistrationStatus(prev => ({
        ...prev,
        [eventId]: { success: false, message: 'Registration failed. Please try again.' }
      }));
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const isUpcoming = (date) => new Date(date) > new Date();

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      (currentTab === 0) || 
      (currentTab === 1 && isUpcoming(event.date)) ||
      (currentTab === 2 && !isUpcoming(event.date));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="events-page">
      <div className="events-hero">
        <Container maxWidth="lg">
          <Typography variant="h2" className="hero-title">
            Campus Events
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            Discover and participate in exciting events happening around campus
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Search and Filter Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Tabs 
                value={currentTab} 
                onChange={(_, newValue) => setCurrentTab(newValue)}
                variant="fullWidth"
              >
                <Tab label="All Events" />
                <Tab label="Upcoming" />
                <Tab label="Past Events" />
              </Tabs>
            </Grid>
          </Grid>
        </Box>

        {/* Events Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card className="event-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image || '/images/event-default.jpg'}
                    alt={event.title}
                    className="event-image"
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        icon={<CalendarIcon />}
                        label={format(new Date(event.date), 'MMM dd, yyyy')}
                        size="small"
                        className="event-date-chip"
                      />
                    </Box>
                    <Typography variant="h6" className="event-title">
                      {event.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.location}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" className="event-description">
                      {event.description.substring(0, 120)}...
                    </Typography>
                    
                    {registrationStatus[event.id] && (
                      <Alert 
                        severity={registrationStatus[event.id].success ? "success" : "error"}
                        sx={{ mt: 1, mb: 1 }}
                      >
                        {registrationStatus[event.id].message}
                      </Alert>
                    )}

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        onClick={() => setSelectedEvent(event)}
                        className="view-details-button"
                      >
                        View Details
                      </Button>
                      {user && isUpcoming(event.date) && (
                        <Button
                          variant="outlined"
                          onClick={() => handleRegisterEvent(event.id)}
                          className="register-button"
                        >
                          Register
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Event Details Dialog */}
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedEvent && (
            <DialogContent>
              <IconButton
                onClick={() => setSelectedEvent(null)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <Box sx={{ pt: 2 }}>
                <img
                  src={selectedEvent.image || '/images/event-default.jpg'}
                  alt={selectedEvent.title}
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
                  {selectedEvent.title}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography>
                        {format(new Date(selectedEvent.date), 'PPP')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography>
                        {selectedEvent.location}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography>
                        {selectedEvent.attendees?.length || 0} Registered
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography variant="body1" paragraph>
                  {selectedEvent.description}
                </Typography>

                {user && isUpcoming(selectedEvent.date) && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleRegisterEvent(selectedEvent.id)}
                    className="register-button-large"
                  >
                    Register for Event
                  </Button>
                )}
              </Box>
            </DialogContent>
          )}
        </Dialog>
      </Container>
    </div>
  );
};

export default Events; 