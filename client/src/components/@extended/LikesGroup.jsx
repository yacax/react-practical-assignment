import * as React from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addInfo } from '../../store/infoSlice';
import mainApi from '../../utils/api';
import { changePostById } from '../../store/postsSlice';

export default function LikesGroup({
  postId, groupSize, mt, ml,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const post = useSelector((state) => state.posts.posts.find((el) => el.id === postId));
  const [count, setCount] = React.useState(0);
  const [isCurrentUserLiked, setIsCurrentUserLiked] = React.useState(false);
  const [isCurrentUserDisliked, setIsCurrentUserDisliked] = React.useState(false);

  const handleLikeOrDislike = async (actionType) => {
    const isLiked = post.likes.includes(currentUser);
    const isDisliked = post.dislikes.includes(currentUser);
    if ((actionType === 'like' && isLiked) || (actionType === 'dislike' && isDisliked)) {
      return;
    }

    const updatedLikes = actionType === 'like'
      ? [...post.likes, currentUser]
      : post.likes.filter((like) => like !== currentUser);

    const updatedDislikes = actionType === 'dislike'
      ? [...post.dislikes, currentUser]
      : post.dislikes.filter((dislike) => dislike !== currentUser);

    const editedPost = {
      ...post,
      likes: updatedLikes,
      dislikes: updatedDislikes,
    };

    try {
      const responseUpdatePost = await mainApi.updatePost(post.id, editedPost);
      if (responseUpdatePost.success) {
        dispatch(changePostById({
          id: responseUpdatePost.result.id,
          updates: {
            likes: responseUpdatePost.result.likes,
            dislikes: responseUpdatePost.result.dislikes,
          },
        }));

        setIsCurrentUserLiked(actionType === 'like');
        setIsCurrentUserDisliked(actionType === 'dislike');
      }
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    }
  };

  React.useEffect(() => {
    if (post) {
      setCount(post.likes.length - post.dislikes.length);
      setIsCurrentUserLiked(post.likes.includes(currentUser));
      setIsCurrentUserDisliked(post.dislikes.includes(currentUser));
    }
  }, [post, currentUser]);

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
      }}
    >
      <IconButton aria-label="LikeButton" onClick={() => handleLikeOrDislike('like')}>
        {isCurrentUserLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
      </IconButton>
      <Button
        sx={{
          backgroundColor: getLikeColour(count),
          minWidth: '30px',
          maxWidth: '60px',
        }}
      >
        {count}
      </Button>
      <IconButton aria-label="DislikeButton" onClick={() => handleLikeOrDislike('dislike')}>
        {isCurrentUserDisliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
      </IconButton>
    </ButtonGroup>
  );
}

LikesGroup.propTypes = {
  postId: PropTypes.number.isRequired,
  groupSize: PropTypes.string,
  mt: PropTypes.number,
  ml: PropTypes.number,
};

LikesGroup.defaultProps = {
  groupSize: 'md',
  mt: 0,
  ml: 0,
};
