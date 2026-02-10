import React from "react";
import { AppBar, Chip, Toolbar, Box, Typography, Button } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import useEth from "../../contexts/EthContext/useEth";
import useAuth from "../../contexts/AuthContext/useAuth";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import logo from "../../assets/LogoTealBG.jpg";

const MainLayout = () => {
  const { state: { accounts, role } } = useEth();
  const { user, login, logout, authLoading } = useAuth();

  const accountText = accounts?.[0] ?? "Wallet not connected";
  const chipLabel = role === "unknown" ? "not registered" : role;

  return (
    <Box>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg,#00796b,#009688)', boxShadow: 3 }}>
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <Box display="flex" alignItems="center" component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
              <img src={logo} alt="sanjeevani-logo" style={{ height: 72, width: 72, marginRight: 8 }} />
              <Typography variant="h6" color="white" sx={{ fontWeight: 600 }}>
                Sanjeevani
              </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button component={RouterLink} to="/" color="inherit" sx={{ color: 'rgba(255,255,255,0.9)' }}>Home</Button>
            <Button component={RouterLink} to="/doctor" color="inherit" sx={{ color: 'rgba(255,255,255,0.9)' }}>Doctor</Button>
            <Button component={RouterLink} to="/patient" color="inherit" sx={{ color: 'rgba(255,255,255,0.9)' }}>Patient</Button>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center">
              <PersonRoundedIcon sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 22 }} />
              <Typography variant="body2" color="white" sx={{ ml: 0.5, mr: 1, fontWeight: 500 }}>
                {accountText}
              </Typography>
              <Chip
                label={chipLabel}
                sx={{ fontSize: 12, backgroundColor: 'rgba(255,255,255,0.12)', color: "white" }}
              />
            </Box>

            {!user ? (
              <Button variant="contained" color="secondary" onClick={login} disabled={authLoading} sx={{ backgroundColor: '#fff', color: '#00796b' }}>
                {authLoading ? 'Connecting...' : 'Login'}
              </Button>
            ) : (
              <Button variant="outlined" onClick={logout} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
