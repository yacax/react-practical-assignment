import React from 'react';
import {
  Box, Typography, Link,
} from '@mui/material';

function Footer() {
  return (
    <Box
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: { xs: 'center', sm: 'left' },
        my: { xs: 5, md: 4 },

      }}
    >
      <Typography
        sx={{
          mb: { xs: 1, sm: 2 },
        }}
      >
        © Postit
      </Typography>
      <Typography
        variant="body2"
      >
        <Link color="inherit" href="https://google.com">
          All rights reserved
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
