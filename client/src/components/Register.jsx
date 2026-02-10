import { useContext, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress, Chip } from "@mui/material";
import EthContext from "../contexts/EthContext/EthContext";
import CustomButton from "./CustomButton";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";

const Register = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [loading, setLoading] = useState(false);

  const registerAsDoctor = async () => {
    if (!contract || !accounts) {
      alert("Wallet not connected correctly.");
      return;
    }
    
    setLoading(true);
    try {
      // Calls addDoctor() from EHR.sol
      await contract.methods.addDoctor().send({ from: accounts[0] });
      alert("Registration Successful!");
      window.location.reload(); // Reloads to let EthProvider fetch the new 'doctor' role
    } catch (err) {
      console.error("Registration failed", err);
      alert("Transaction failed or rejected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%" },
          maxWidth: 500,
          p: 4,
          borderRadius: "16px",
          background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
          boxShadow: '0 20px 50px rgba(102, 126, 234, 0.2)',
          animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          '@keyframes slideUp': {
            from: { opacity: 0, transform: 'translateY(40px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 0 }}>
          {/* Header */}
          <Box mb={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              🏥 Sanjeevani
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.05rem', fontWeight: 500 }}>
              Healthcare on the Blockchain
            </Typography>
          </Box>

          {/* Status Section */}
          <Box
            sx={{
              p: 3,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
              border: '2px solid rgba(102, 126, 234, 0.1)',
              mb: 4,
            }}
          >
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2, fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Your Wallet
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
                color: '#667eea',
                wordBreak: 'break-all',
                mb: 2,
              }}
            >
              {accounts?.[0]}
            </Typography>
            <Chip
              label="Not Registered"
              color="error"
              variant="filled"
              size="medium"
              sx={{
                fontWeight: 700,
                borderRadius: '8px',
              }}
            />
          </Box>

          {/* Registration Info */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              You need to register as a Doctor to manage patient records on Sanjeevani.
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
              This transaction will register your wallet on the blockchain.
            </Typography>
          </Box>

          {/* Register Button */}
          <Box sx={{ position: 'relative' }}>
            <CustomButton
              text={loading ? "Registering..." : "Register as Doctor"}
              handleClick={registerAsDoctor}
              disabled={loading || !contract || !accounts}
            />
          </Box>

          {/* Help Text */}
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 3 }}>
            Need help? Make sure MetaMask is connected and you have enough ETH for gas fees.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;