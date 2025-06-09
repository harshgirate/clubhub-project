import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, 
  InputAdornment, Chip, CircularProgress, Box, IconButton, Dialog, DialogContent,
  Tooltip, Snackbar, Alert, Fade
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterList as FilterIcon, 
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import axios from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import './Clubs.css';

const SAMPLE_CLUBS = [
  {
    id: 1,
    name: "Amogh Club",
    category: "Photography",
    description: "Discover the art of photography with Amogh Club. From basic techniques to advanced composition, join us to explore photography through workshops, photo walks, and exhibitions. Perfect for both beginners and experienced photographers!",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
    meeting_time: "Every Saturday, 3:00 PM",
    location: "Media Center, Ground Floor",
    email: "amogh.club@svvv.edu.in",
    members: Array(32).fill(null),
    googleFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSeVvDdRzaUWCbo5wToUqqGVaXDCIKh6WlxWqxXbBkymvJqVdQ/viewform?usp=header" // Add the Google Form link here
  },
  {
    id: 2,
    name: "Natraj Club",
    category: "Dance",
    description: "Experience the rhythm of life at Natraj Club! We offer training in various dance forms including classical, contemporary, and folk. Join us for energetic performances, choreography workshops, and cultural celebrations.",
    image: "/images/svvv-dance-event.jpg",
    meeting_time: "Tuesday & Thursday, 5:00 PM",
    location: "Dance Studio, Cultural Complex",
    email: "natraj.club@svvv.edu.in",
    members: Array(45).fill(null),
    googleFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSeVvDdRzaUWCbo5wToUqqGVaXDCIKh6WlxWqxXbBkymvJqVdQ/viewform?usp=header" // Add the Google Form link here
  },
  {
    id: 3,
    name: "Ameya Club",
    category: "Gaming",
    description: "Welcome to Ameya Gaming Club! From esports tournaments to game development workshops, we're your hub for all things gaming. Join us for competitive gaming events, game design sessions, and networking with fellow gamers.",
    image: "/images/image.png",
    meeting_time: "Friday, 4:00 PM",
    location: "Gaming Arena, Tech Block",
    email: "ameya.club@svvv.edu.in",
    members: Array(38).fill(null),
    googleFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSeVvDdRzaUWCbo5wToUqqGVaXDCIKh6WlxWqxXbBkymvJqVdQ/viewform?usp=header" // Add the Google Form link here
  }
];

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const { user } = useAuth();

  const fetchClubs = async () => {
    try {
      setClubs(SAMPLE_CLUBS);
      const uniqueCategories = [...new Set(SAMPLE_CLUBS.map(club => club.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      showNotification('Failed to fetch clubs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchClubs();
  }, []);

  const handleJoinClub = async (clubId) => {
    const selectedClub = clubs.find(club => club.id === clubId);
    if (selectedClub && selectedClub.googleFormLink) {
      window.location.href = selectedClub.googleFormLink; // Redirect to the Google Form link
    } else {
      showNotification('Google Form link not available', 'error');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="clubs-page">
      <div className="clubs-hero">
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              <Typography variant="h2" className="hero-title">
                Join Amazing Communities
              </Typography>
              <Typography variant="h6" className="hero-subtitle">
                Discover clubs that match your interests and passions
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Chip 
                  label={`${clubs.length} Active Clubs`} 
                  color="primary" 
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', px: 2 }}
                />
                <Chip 
                  label={`${categories.length} Categories`} 
                  color="primary"
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', px: 2 }}
                />
              </Box>
            </Box>
          </Fade>
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
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                    color={category === selectedCategory ? "primary" : "default"}
                    className="category-chip"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Clubs Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredClubs.map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.id}>
                <Fade in timeout={500}>
                  <Card className="club-card">
                    <CardMedia
                      component="img"
                      height="200"
                      image={club.image || '/images/club-default.jpg'}
                      alt={club.name}
                      className="club-image"
                    />
                    <CardContent>
                      <Typography variant="h6" className="club-name">
                        {club.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={club.category}
                          size="small"
                          className="club-category"
                        />
                        <Chip
                          icon={<PeopleIcon />}
                          label={`${club.members?.length || 0} members`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" className="club-description">
                        {club.description.substring(0, 120)}...
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                          variant="contained"
                          onClick={() => setSelectedClub(club)}
                          className="view-details-button"
                        >
                          View Details
                        </Button>
                        {user && (
                          <Button
                            variant="outlined"
                            onClick={() => handleJoinClub(club.id)}
                            className="join-button"
                          >
                            Join Club
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Club Details Dialog */}
        <Dialog
          open={Boolean(selectedClub)}
          onClose={() => setSelectedClub(null)}
          maxWidth="md"
          fullWidth
          className="club-dialog"
        >
          {selectedClub && (
            <DialogContent>
              <IconButton
                onClick={() => setSelectedClub(null)}
                sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
                className="close-button"
              >
                <CloseIcon />
              </IconButton>
              <Box sx={{ pt: 2 }}>
                <img
                  src={selectedClub.image || '/images/club-default.jpg'}
                  alt={selectedClub.name}
                  className="club-detail-image"
                />
                <Typography variant="h4" sx={{ mt: 3, mb: 2 }} className="club-detail-title">
                  {selectedClub.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <Chip label={selectedClub.category} className="club-detail-category" />
                  <Chip 
                    icon={<PeopleIcon />} 
                    label={`${selectedClub.members?.length || 0} members`}
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body1" paragraph className="club-detail-description">
                  {selectedClub.description}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Box className="info-item">
                      <ScheduleIcon />
                      <Typography>{selectedClub.meeting_time}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box className="info-item">
                      <LocationIcon />
                      <Typography>{selectedClub.location}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box className="info-item">
                      <EmailIcon />
                      <Typography>{selectedClub.email}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                {user && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleJoinClub(selectedClub.id)}
                    className="join-button-large"
                  >
                    Join Club
                  </Button>
                )}
              </Box>
            </DialogContent>
          )}
        </Dialog>

        {/* Notifications */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Clubs;
