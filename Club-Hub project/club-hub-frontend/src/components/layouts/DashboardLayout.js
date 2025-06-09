import React from 'react';
import { Box, Container, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle, Notifications, Settings } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dashboard-layout">
      {/* Top Bar */}
      <Paper elevation={3} className="dashboard-topbar">
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
            <Box>
              <Typography variant="h4" className="dashboard-title">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              <IconButton color="inherit">
                <Settings />
              </IconButton>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Typography variant="body2" color="text.secondary">
                    Signed in as {user?.email}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </div>
  );
};

export default DashboardLayout; 