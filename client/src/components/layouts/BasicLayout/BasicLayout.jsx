import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Header from './Header/Header';
import SimpleSnackbar from '../../@extended/SimpleSnackbar';
import { clearInfo } from '../../../store/infoSlice';
import Footer from './Footer/Footer';

function BasicLayout({ handleOpenModal, children }) {
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();
  useEffect(() => {
    if (info.message) {
      setTimeout(() => {
        dispatch(clearInfo());
      }, 6500);
    }
  }, [info]);
  return (
    <Container
      component="div"
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        px: { xs: 0, sm: 2, md: 4 },
        minHeight: '100vh',
      }}
    >
      <Header handleOpenModal={handleOpenModal} />
      {children}
      <Footer />
      <SimpleSnackbar severity={info.severity} message={info.message} />
    </Container>
  );
}

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
  handleOpenModal: PropTypes.func,
};

BasicLayout.defaultProps = {
  handleOpenModal: () => {},
};

export default BasicLayout;
