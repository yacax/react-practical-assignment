import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function SettingCardMenu({
  isOwner, deletePost, duplicatePost, editPost,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePostDelete = (event) => {
    event.preventDefault();
    deletePost();
    handleClose();
  };

  const handlePostDuplicate = (event) => {
    event.preventDefault();
    duplicatePost();
    handleClose();
  };

  const handlePostEdit = (event) => {
    event.preventDefault();
    editPost();
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        { isOwner && (
        <MenuItem onClick={handlePostEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        ) }
        <MenuItem onClick={handlePostDuplicate} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>

        {isOwner && (<Divider sx={{ my: 0.5 }} />)}
        {isOwner && (
          <MenuItem onClick={handlePostDelete} disableRipple>
            <DeleteIcon />
            Delete
          </MenuItem>

        )}

      </StyledMenu>
    </div>
  );
}

SettingCardMenu.propTypes = {
  deletePost: PropTypes.func.isRequired,
  duplicatePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  isOwner: PropTypes.bool,
};

SettingCardMenu.defaultProps = {
  isOwner: false,
};
