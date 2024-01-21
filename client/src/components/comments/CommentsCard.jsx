import React from 'react';
import { PropTypes } from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import getSimpleDate from '../../utils/getSimpleDate';
import getAvatarColor from '../../utils/getAvatarColors';
import { DEFAULT_AVATAR_LETTER } from '../../utils/config';
import { fetchCommentUpdate, fetchCommentDelete } from '../../store/postsThunks';
import { addInfo } from '../../store/infoSlice';
import LikesGroupIndicator from '../@extended/LikesGroupIndicator';
import PopoverComment from '../@extended/PopoverComment';
import useIsLikedValue from '../../hooks/useIsLikedValue';

export default function CommentCard({ comment, id, commentsLength }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLikedValue = useIsLikedValue(comment.likes, comment.dislikes);
  const isOwner = currentUser === comment.username || currentUser === 'admin';

  const handleLikeOrDislike = async (type) => {
    if (!comment || !currentUser) return;
    let updatedLikes = [...comment.likes];
    let updatedDislikes = [...comment.dislikes];
    if (type === 'like') {
      if (updatedLikes.includes(currentUser)) {
        updatedLikes = updatedLikes.filter((user) => user !== currentUser);
      } else {
        updatedLikes.push(currentUser);
        updatedDislikes = updatedDislikes.filter((user) => user !== currentUser);
      }
    } else if (type === 'dislike') {
      if (updatedDislikes.includes(currentUser)) {
        updatedDislikes = updatedDislikes.filter((user) => user !== currentUser);
      } else {
        updatedDislikes.push(currentUser);
        updatedLikes = updatedLikes.filter((user) => user !== currentUser);
      }
    }

    const updatedComment = {
      ...comment,
      likes: updatedLikes,
      dislikes: updatedDislikes,
    };
    try {
      await dispatch(fetchCommentUpdate({ id: comment.id, comment: updatedComment }));
      dispatch(addInfo({ message: 'Comment updated', severity: 'success' }));
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    }
  };

  const handleCommentDelete = async () => {
    try {
      await dispatch(fetchCommentDelete(comment.id));
      dispatch(addInfo({ message: 'Comment deleted', severity: 'info' }));
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    }
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          flexDirection: 'column',

        }}
      >
        <Box
          display="flex"
          alignItems="flex-start"
        >
          <ListItemAvatar sx={{ minWidth: '48px' }}>
            <Avatar
              sx={{
                bgcolor: getAvatarColor(comment.username[0]),
                width: 34,
                height: 34,
              }}
              aria-label="recipe"
            >
              {comment.username[0] || DEFAULT_AVATAR_LETTER}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={(
              <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                <Typography
                  component="span"
                  sx={{ display: 'inline' }}
                  variant="body1"
                  color="text.primary"
                >
                  {comment.username}
                </Typography>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {getSimpleDate(+comment.date)}
                </Typography>
                <Typography
                  sx={{
                    display: 'block',
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {comment.text}
                </Typography>
                <LikesGroupIndicator
                  placeLocation="comment"
                  color="primary"
                  isLikedValue={isLikedValue}
                  likesCount={comment.likes.length - comment.dislikes.length}
                  elementId={comment.id}
                  handleLikeOrDislike={handleLikeOrDislike}
                  variant="text"
                  groupSize="sm"
                  mt={0}
                />
              </Box>
            )}
          />
        </Box>
        {isOwner && (
          <Box position="absolute" display="flex" flexDirection="row" top={7} right={5}>
            <PopoverComment postId={comment.postId} commentId={comment.id} popoverType="edit" />
            <IconButton aria-label="delete" onClick={handleCommentDelete}>
              <DeleteIcon color="primary" fontSize="small" />
            </IconButton>
          </Box>
        ) }
      </ListItem>
      { (commentsLength - 1 !== id)
  && <Divider variant="inset" component="li" />}
    </>
  );
}

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  commentsLength: PropTypes.number,
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    postId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    dislikes: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string.isRequired,
  }).isRequired,
};

CommentCard.defaultProps = {
  commentsLength: 0,
};
