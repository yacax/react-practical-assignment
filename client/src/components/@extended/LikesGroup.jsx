import * as React from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';

export default function LikesGroup({
  likesQuantity, dislikesQuantity, groupSize, mt, ml,
}) {
  const [likes, setLikes] = React.useState({ like: false, dislike: false, count: 0 });

  React.useEffect(() => {
    setLikes((prev) => ({
      ...prev,
      count: likesQuantity - dislikesQuantity,
    }));
  }, []);

  const getLikeColour = (likesCount) => {
    if (likesCount > 0) {
      return 'primary';
    }
    if (likesCount < 0) {
      return 'error';
    }
    return 'inherit';
  };

  return (
    <ButtonGroup
      color="primary"
      size={groupSize}
      variant="outlined"
      sx={{
        mt,
        ml,
        // mt: '10px',
      }}
    >
      <IconButton aria-label="LikeButton">
        {likes.like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
      </IconButton>
      <Button
        sx={{
          backgroundColor: getLikeColour(likes.count),
          minWidth: '30px',
          maxWidth: '60px',
        }}
      >
        {likes.count}
      </Button>
      <IconButton aria-label="DislikeButton">
        {likes.dislike ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
      </IconButton>
    </ButtonGroup>
  );
}

LikesGroup.propTypes = {
  likesQuantity: PropTypes.number.isRequired,
  dislikesQuantity: PropTypes.number.isRequired,
  groupSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  mt: PropTypes.number,
  ml: PropTypes.number,
};

LikesGroup.defaultProps = {
  groupSize: 'md',
  mt: 0,
  ml: 0,
};
