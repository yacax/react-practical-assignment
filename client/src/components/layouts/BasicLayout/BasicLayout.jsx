import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Header from './Header/Header';

function BasicLayout({ children }) {
  return (
    <Container
      component="div"
      display="flex"
      maxWidth="lg"
      sx={{
        px: { xs: 0, sm: 2, md: 4 },
        minHeight: '100vh',
      }}
    >
      <Header />
      {children}
    </Container>
  );
}

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
