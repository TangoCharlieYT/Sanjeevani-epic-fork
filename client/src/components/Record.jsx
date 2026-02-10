import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";

const Record = ({ record }) => {
  const [cid, name, patientId, doctorId, timestamp] = record;

  return (
    <Card sx={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
      border: '1px solid rgba(0, 121, 107, 0.1)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        boxShadow: '0 12px 24px rgba(0, 121, 107, 0.15)',
        transform: 'translateY(-4px)',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #f0f0f0 100%)',
      },
    }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={1}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00796b 0%, #004d40 100%)',
            }}>
              <DescriptionRoundedIcon sx={{ fontSize: 28, color: 'white' }} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                📄 File Name
              </Typography>
              <Typography variant="body2" noWrap sx={{ fontWeight: 600, mt: 0.5 }}>
                {name}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                👨‍⚕️ Doctor Address
              </Typography>
              <Typography variant="body2" noWrap sx={{ fontWeight: 500, mt: 0.5, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                {`${doctorId.slice(0, 6)}...${doctorId.slice(-4)}`}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                ⏰ Date Created
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5 }}>
                {dayjs.unix(timestamp).format("MMM DD, YYYY")}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={1} display="flex" justifyContent="center">
            <a
              href={`https://med-chain.infura-ipfs.io/ipfs/${cid}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                sx={{
                  background: 'linear-gradient(135deg, #00796b 0%, #004d40 100%)',
                  color: 'white',
                  width: 44,
                  height: 44,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 6px 16px rgba(0, 121, 107, 0.3)',
                  },
                }}
              >
                <CloudDownloadRoundedIcon />
              </IconButton>
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Record;
