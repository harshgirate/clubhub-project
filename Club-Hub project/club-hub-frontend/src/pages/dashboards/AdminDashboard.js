import React, { useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, Box, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  MenuItem, Select, FormControl, InputLabel, Chip, Alert, CircularProgress,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../config/api';
import './Dashboard.css';

const SAMPLE_CLUBS = [
  {
    id: 1,
    name: "Amogh Club",
    category: "Photography",
    description: "Photography club for enthusiasts",
    meeting_time: "Every Saturday, 3:00 PM",
    location: "Media Center",
    email: "amogh@club.com",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
    memberCount: 32
  },
  {
    id: 2,
    name: "Natraj Club",
    category: "Dance",
    description: "Dance club for all styles",
    meeting_time: "Tuesday & Thursday, 5:00 PM",
    location: "Dance Studio",
    email: "natraj@club.com",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    memberCount: 45
  },
  {
    id: 3,
    name: "Ameya Club",
    category: "Gaming",
    description: "Gaming and esports club",
    meeting_time: "Friday, 4:00 PM",
    location: "Gaming Arena",
    email: "ameya@club.com",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    memberCount: 38
  }
];

function AdminDashboard() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [stats, setStats] = useState({
    totalClubs: 0,
    totalMembers: 0,
    activeClubs: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    meeting_time: '',
    location: '',
    email: '',
    image: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Simulate API call with sample data
      setTimeout(() => {
        setClubs(SAMPLE_CLUBS);
        setStats({
          totalClubs: SAMPLE_CLUBS.length,
          totalMembers: SAMPLE_CLUBS.reduce((acc, club) => acc + club.memberCount, 0),
          activeClubs: SAMPLE_CLUBS.length
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showNotification('Failed to load dashboard data', 'error');
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

  const handleCreateClub = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedClub) {
        // Update existing club
        const updatedClubs = clubs.map(club => 
          club.id === selectedClub.id ? { ...club, ...formData } : club
        );
        setClubs(updatedClubs);
        showNotification('Club updated successfully', 'success');
      } else {
        // Create new club
        const newClub = {
          id: clubs.length + 1,
          ...formData,
          memberCount: 0
        };
        setClubs([...clubs, newClub]);
        showNotification('Club created successfully', 'success');
      }
      
      setOpenDialog(false);
      resetForm();
    } catch (error) {
      showNotification('Failed to save club', 'error');
    }
  };

  const handleDeleteClub = async (clubId) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClubs(clubs.filter(club => club.id !== clubId));
        showNotification('Club deleted successfully', 'success');
      } catch (error) {
        showNotification('Failed to delete club', 'error');
      }
    }
  };

  const handleEditClub = (club) => {
    setSelectedClub(club);
    setFormData({
      name: club.name,
      category: club.category,
      description: club.description,
      meeting_time: club.meeting_time,
      location: club.location,
      email: club.email,
      image: club.image
    });
    setOpenDialog(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      meeting_time: '',
      location: '',
      email: '',
      image: ''
    });
    setSelectedClub(null);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  if (loading) {
    return (
      <DashboardLayout title="Admin Dashboard">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      subtitle={`Welcome back, ${user?.firstName || 'Admin'}`}
    >
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Clubs', value: stats.totalClubs, icon: <GroupIcon />, color: '#2196f3' },
          { title: 'Total Members', value: stats.totalMembers, icon: <PeopleIcon />, color: '#4caf50' },
          { title: 'Active Clubs', value: stats.activeClubs, icon: <SchoolIcon />, color: '#9c27b0' }
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
          Create New Club
        </Button>
      </Box>

      {/* Clubs List */}
      <Grid container spacing={3}>
        {clubs.map((club) => (
          <Grid item xs={12} md={6} key={club.id}>
            <Card className="club-card">
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    src={club.image}
                    alt={club.name}
                    sx={{ width: 64, height: 64, borderRadius: 2 }}
                  />
                  <Box flex={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="h6" className="club-name">
                          {club.name}
                        </Typography>
                        <Chip 
                          label={club.category}
                          size="small"
                          className={`category-chip ${club.category.toLowerCase().replace(' ', '-')}`}
                        />
                      </Box>
                      <Box>
                        <IconButton onClick={() => handleEditClub(club)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClub(club.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {club.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Chip
                        icon={<PeopleIcon />}
                        label={`${club.memberCount} Members`}
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        icon={<EmailIcon />}
                        label={club.email}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Club Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedClub ? 'Edit Club' : 'Create New Club'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Club Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
                required
              >
                <MenuItem value="Photography">Photography</MenuItem>
                <MenuItem value="Dance">Dance</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
              </Select>
            </FormControl>
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
            <TextField
              fullWidth
              label="Meeting Time"
              name="meeting_time"
              value={formData.meeting_time}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleCreateClub}
            className="create-button"
          >
            {selectedClub ? 'Save Changes' : 'Create Club'}
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

export default AdminDashboard;
