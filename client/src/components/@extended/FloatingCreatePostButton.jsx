import React from 'react';
import { PropTypes } from 'prop-types';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

export default function FloatingCreatePostButton({ handleOpenModal }) {
  return (
    <Tooltip title="Add a new post" aria-label="add">
      <Fab
        onClick={() => handleOpenModal('modalPost')}
        color="secondary"
        aria-label="add"
        sx={{
          // position: { xs: 'fixed', xl: 'absolute' },
          position: 'fixed',
          bottom: 42,
          right: {
            xs: 16, sm: 24, md: 52, lg: 172, xl: 396,
          },
          width: { xs: 48, sm: 64, md: 98 },
          height: { xs: 48, sm: 64, md: 98 },
        }}
      >
        <AddIcon
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
          }}
        />
      </Fab>
    </Tooltip>
  );
}

FloatingCreatePostButton.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};
