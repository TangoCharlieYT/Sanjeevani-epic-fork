import React from "react";
import { Button, Typography } from "@mui/material";
import { grey, teal } from "@mui/material/colors";

const CustomButton = ({ text, handleClick, disabled = false, startIcon, children }) => {
  return (
    <Button
      startIcon={startIcon || children}
      variant="contained"
      onClick={handleClick}
      disabled={disabled}
      sx={{
        background: disabled 
          ? grey[400] 
          : 'linear-gradient(135deg, #00796b 0%, #00bcd4 100%)',
        textTransform: "none",
        padding: "12px 28px",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "0.95rem",
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: disabled ? 'none' : '0 4px 12px rgba(0, 121, 107, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        "&::before": {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.2)',
          transition: 'left 0.5s ease',
          zIndex: 0,
        },
        "&:hover::before": disabled ? {} : {
          left: '100%',
        },
        "&:hover": disabled ? {} : {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 20px rgba(0, 121, 107, 0.4)',
          background: 'linear-gradient(135deg, #004d40 0%, #0097a7 100%)',
        },
        "&:active": disabled ? {} : {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0, 121, 107, 0.3)',
        },
        "&:disabled": {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant="button" color="white" sx={{ fontWeight: 600, position: 'relative', zIndex: 1 }}>
        {text}
      </Typography>
    </Button>
  );
};

export default CustomButton;

