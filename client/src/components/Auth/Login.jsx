import React from "react";
import { Box, Button, Typography } from "@mui/material";
import useAuth from "../../contexts/AuthContext/useAuth";
import useEth from "../../contexts/EthContext/useEth";

const Login = () => {
  const { user, login, logout, authLoading } = useAuth();
  const { state } = useEth();
  const accounts = state?.accounts;

  const handleLogin = async () => {
    if (!accounts || !accounts[0]) {
      try {
        // trigger metamask connect
        await state.web3.eth.requestAccounts();
      } catch (err) {
        console.error(err);
        return;
      }
    }

    const res = await login();
    if (!res.success) {
      alert(`Login failed: ${res.error || "unknown"}`);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={8}>
      {!user ? (
        <>
          <Typography variant="h6" mb={2}>
            Please login with your Ethereum wallet to continue
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogin} disabled={authLoading}>
            {authLoading ? "Connecting..." : "Login with MetaMask"}
          </Button>
        </>
      ) : (
        <>
          <Typography variant="subtitle1" mb={2}>
            Logged in as {user.address}
          </Typography>
          <Button variant="outlined" color="secondary" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Login;
