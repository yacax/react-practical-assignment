import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Header from './Header/Header';
import SimpleSnackbar from '../../@extended/SimpleSnackbar';
import { clearInfo } from '../../../store/infoSlice';

function BasicLayout({ children }) {
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();
  useEffect(() => {
    if (info.message) {
      setTimeout(() => {
        dispatch(clearInfo());
      }, 6001);
    }
  }, [info]);
  return (
    <Container
      component="div"
      display="flex"
      maxWidth="lg"
      sx={{
        position: 'relative',
        px: { xs: 0, sm: 2, md: 4 },
        minHeight: '100vh',
      }}
    >
      <Header />
      {children}
      <SimpleSnackbar severity={info.severity} message={info.message} />
    </Container>
  );
}

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
