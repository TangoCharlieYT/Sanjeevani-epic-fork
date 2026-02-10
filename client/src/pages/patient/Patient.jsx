import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Backdrop, CircularProgress } from "@mui/material";
import useEth from "../../contexts/EthContext/useEth";
import Record from "../../components/Record";

const Patient = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth();

  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  useEffect(() => {
    if (!contract || !accounts) return;

    const fetchRecords = async () => {
      try {
        const recs = await contract.methods
          .getRecords(accounts[0])
          .call({ from: accounts[0] });
        setRecords(recs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRecords(false);
      }
    };

    fetchRecords();
  }, [contract, accounts]);

  if (loading || loadingRecords) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || loadingRecords}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!accounts) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6">
          Open your MetaMask wallet to get connected, then refresh this page
        </Typography>
      </Box>
    );
  }

  if (role === "unknown") {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h5">
          You're not registered, please go to home page
        </Typography>
      </Box>
    );
  }

  if (role === "doctor") {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h5">Only patient can access this page</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" width="100%" sx={{ minHeight: '100vh', p: { xs: 1, md: 2 } }}>
      <Box width={{ xs: "100%", sm: "90%", md: "70%" }}>
        {/* Header Card */}
        <Card sx={{
          mb: 4,
          background: 'linear-gradient(135deg, #00bcd4 0%, #0087a8 100%)',
          color: 'white',
          boxShadow: 6,
          animation: 'fadeInDown 0.6s ease-in-out',
          '@keyframes fadeInDown': {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              📁 My Medical Records
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
              Securely stored on the blockchain • encrypted with IPFS
            </Typography>
          </CardContent>
        </Card>

        {/* Records List */}
        {records.length === 0 ? (
          <Card sx={{
            boxShadow: 2,
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            animation: 'fadeInUp 0.6s ease-in-out 0.2s both',
            '@keyframes fadeInUp': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}>
            <CardContent sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" color="textSecondary" mb={1}>
                📭 No Records Yet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Your medical records will appear here once your doctor uploads them.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {records.map((record, index) => (
              <Box key={index} sx={{
                animation: `fadeIn 0.4s ease-in-out ${0.3 + index * 0.1}s both`,
                '@keyframes fadeIn': {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}>
                <Record record={record} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Patient;
