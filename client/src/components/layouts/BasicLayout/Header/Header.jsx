import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SignpostIcon from '@mui/icons-material/Signpost';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { clearCurrentUser } from '../../../../store/userSlice';

export default function Header({ handleOpenModal }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewPost = () => {
    handleOpenModal('modalPost');
    handleClose();
  };

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    localStorage.removeItem('currentUser');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SignpostIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Postit
          </Typography>
          {currentUser && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ padding: '0' }}
              >
                <Typography variant="body1" mr="24px">
                  {currentUser}
                </Typography>
                <AccountCircle mr="0" />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ mt: '35px', ml: '10px' }}
              >
                <MenuItem
                  onClick={handleNewPost}
                  sx={{ justifyContent: 'right' }}
                >
                  New post
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{ color: 'red', justifyContent: 'right' }}
                >
                  Logout

                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};
