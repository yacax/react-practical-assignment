import React from 'react';
import {
  Box, Container, Typography, Link,
} from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        py: 3,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography
          sx={{
            mb: { xs: 1, sm: 0 },
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
      </Container>
    </Box>
  );
}

export default Footer;
