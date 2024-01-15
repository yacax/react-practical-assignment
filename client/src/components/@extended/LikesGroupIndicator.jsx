import * as React from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import { useTheme } from '@mui/material/styles';

export default function LikesGroupIndicator({
  isLikedValue, likesCount, elementId, handleLikeOrDislike, groupSize, mt, ml, variant, color,
}) {
  const theme = useTheme();
  const getLikeColour = (count) => {
    if (count > 0) {
      return theme.palette.primary.main;
    }
    if (count < 0) {
      return theme.palette.secondary.main;
    }
    return theme.palette.primary.main;
  };

  const handleLClick = (event) => {
    event.preventDefault();
    const type = event.currentTarget.name;
    handleLikeOrDislike(type, elementId);
  };

  return (
    <ButtonGroup
      color={color}
      size={groupSize}
      variant={variant}
      sx={{
        mt,
        ml,
      }}
    >
      <IconButton aria-label="LikeButton" name="like" onClick={handleLClick} color={color}>
        {isLikedValue === 1 ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
      </IconButton>
      <Button
        sx={{
          color: getLikeColour(likesCount),
          minWidth: '30px',
          maxWidth: '60px',
        }}
      >
        {likesCount}
      </Button>
      <IconButton aria-label="DislikeButton" name="dislike" onClick={handleLClick} color={color}>
        {isLikedValue === -1 ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
      </IconButton>
    </ButtonGroup>
  );
}

LikesGroupIndicator.propTypes = {
  elementId: PropTypes.number.isRequired,
  isLikedValue: PropTypes.oneOf([-1, 0, 1]).isRequired,
  likesCount: PropTypes.number.isRequired,
  handleLikeOrDislike: PropTypes.func.isRequired,
  groupSize: PropTypes.string,
  mt: PropTypes.number,
  ml: PropTypes.number,
  variant: PropTypes.string,
  color: PropTypes.string,
};

LikesGroupIndicator.defaultProps = {
  groupSize: 'md',
  mt: 0,
  ml: 0,
  variant: 'outlined',
  color: 'primary',
};
