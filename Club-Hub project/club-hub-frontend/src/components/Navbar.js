import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Groups as GroupsIcon, Event as EventIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const isActive = (path) => location.pathname === path;

  const getNavItems = () => {
    const commonItems = [
      { label: 'Home', path: '/', icon: <HomeIcon /> },
      { label: 'Clubs', path: '/clubs', icon: <GroupsIcon /> },
      { label: 'Events', path: '/events', icon: <EventIcon /> },
    ];

    return commonItems;
  };

  return (
    <AppBar 
      position="fixed" 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      elevation={isScrolled ? 4 : 0}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: '0.5rem 0' }}>
          {/* Logo */}
          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: { xs: 1, md: 0 }, 
              textDecoration: 'none', 
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: 700,
              mr: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span className="text-gradient">Club</span>
            <span className="text-accent">Hub</span>
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', flex: 1 }}>
            {getNavItems().map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                className={`nav-button ${isActive(item.path) ? 'active' : ''}`}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {user ? (
              <>
                <Typography sx={{ mr: 2 }}>
                  Welcome {user.email}
                </Typography>
                <Button 
                  variant="outlined" 
                  color="inherit"
                  onClick={logout}
                  className="auth-button"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  component={Link} 
                  to="/login"
                  className="auth-button"
                >
                  Sign In
                </Button>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/register"
                  className="register-button"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {getNavItems().map((item) => (
              <MenuItem 
                key={item.path}
                component={Link}
                to={item.path}
                onClick={handleMobileMenuClose}
                selected={isActive(item.path)}
              >
                {item.icon}
                <Typography sx={{ ml: 1 }}>{item.label}</Typography>
              </MenuItem>
            ))}
            <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 1, pt: 1 }}>
              {user ? (
                <>
                  <MenuItem disabled>
                    <Typography variant="body2">
                      Welcome, {user.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { logout(); handleMobileMenuClose(); }}>
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleMobileMenuClose}>
                    Sign In
                  </MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleMobileMenuClose}>
                    Sign Up
                  </MenuItem>
                </>
              )}
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 