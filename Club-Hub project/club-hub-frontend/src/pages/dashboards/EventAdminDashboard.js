import React, { useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, Box, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  MenuItem, Select, FormControl, InputLabel, Chip, Alert, CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../config/api';
import { format } from 'date-fns';
import './Dashboard.css';

function EventAdminDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    club: '',
    image: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // In production, replace with actual API calls
      const eventsResponse = await axios.get(API_ENDPOINTS.EVENTS);
      const clubsResponse = await axios.get(API_ENDPOINTS.CLUBS);
      
      setEvents(eventsResponse.data);
      setClubs(clubsResponse.data);
      setStats({
        totalEvents: eventsResponse.data.length,
        upcomingEvents: eventsResponse.data.filter(event => new Date(event.date) > new Date()).length,
        totalRegistrations: eventsResponse.data.reduce((acc, event) => acc + (event.attendees?.length || 0), 0)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = async () => {
    try {
      const dateTime = `${formData.date}T${formData.time}`;
      const eventData = {
        ...formData,
        date: dateTime
      };
      delete eventData.time;

      if (selectedEvent) {
        await axios.put(`${API_ENDPOINTS.EVENTS}${selectedEvent.id}/`, eventData);
        showNotification('Event updated successfully', 'success');
      } else {
        await axios.post(API_ENDPOINTS.EVENTS, eventData);
        showNotification('Event created successfully', 'success');
      }
      
      setOpenDialog(false);
      fetchDashboardData();
      resetForm();
    } catch (error) {
      showNotification('Failed to save event', 'error');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_ENDPOINTS.EVENTS}${eventId}/`);
        showNotification('Event deleted successfully', 'success');
        fetchDashboardData();
      } catch (error) {
        showNotification('Failed to delete event', 'error');
      }
    }
  };

  const handleEditEvent = (event) => {
    const eventDate = new Date(event.date);
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: format(eventDate, 'yyyy-MM-dd'),
      time: format(eventDate, 'HH:mm'),
      location: event.location,
      club: event.club,
      image: event.image
    });
    setOpenDialog(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      club: '',
      image: ''
    });
    setSelectedEvent(null);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  if (loading) {
    return (
      <DashboardLayout title="Event Management">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Event Management" 
      subtitle={`Welcome back, ${user?.firstName || 'Event Admin'}`}
    >
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Events', value: stats.totalEvents, icon: <EventIcon />, color: '#2196f3' },
          { title: 'Upcoming Events', value: stats.upcomingEvents, icon: <CalendarIcon />, color: '#4caf50' },
          { title: 'Total Registrations', value: stats.totalRegistrations, icon: <GroupIcon />, color: '#ff9800' }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="stat-card" sx={{ bgcolor: stat.color }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h4" color="white">
                      {stat.value}
                    </Typography>
                    <Typography variant="subtitle2" color="white" opacity={0.9}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Actions Section */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setOpenDialog(true);
          }}
          className="create-button"
        >
          Create New Event
        </Button>
      </Box>

      {/* Events List */}
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card className="dashboard-card">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" className="event-title">
                      {event.title}
                    </Typography>
                    <Chip 
                      label={new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                      color={new Date(event.date) > new Date() ? 'primary' : 'default'}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEditEvent(event)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteEvent(event.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {event.description}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {format(new Date(event.date), 'PPP')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {event.location}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Chip
                    icon={<GroupIcon />}
                    label={`${event.attendees?.length || 0} Registered`}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={event.club}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Event Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Club</InputLabel>
              <Select
                name="club"
                value={formData.club}
                onChange={handleInputChange}
                label="Club"
                required
              >
                {clubs.map((club) => (
                  <MenuItem key={club.id} value={club.id}>
                    {club.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleCreateEvent}
            className="create-button"
          >
            {selectedEvent ? 'Save Changes' : 'Create Event'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      {notification.show && (
        <Alert
          severity={notification.type}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999
          }}
        >
          {notification.message}
        </Alert>
      )}
    </DashboardLayout>
  );
}

export default EventAdminDashboard;
