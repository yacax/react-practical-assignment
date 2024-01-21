import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <Box
      display="flex"
    >
      <Typography
        display="block"
        variant="subtitle1"
        color="text.secondary"
        ml={1}
        sx={{
          alignSelf: 'center',
        }}
      >
        Comments
      </Typography>
      <IconButton {...other} />
    </Box>
  );
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default ExpandMore;
