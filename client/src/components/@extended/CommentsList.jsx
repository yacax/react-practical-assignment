import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import getSimpleDate from '../../utils/getSimpleDate';
import getAvatarColor from '../../utils/getAvatarColors';
import { DEFAULT_AVATAR_LETTER } from '../../utils/constants';
import { fetchCommentUpdate } from '../../store/postsThunks';
import { addInfo } from '../../store/infoSlice';

import LikesGroupIndicator from './LikesGroupIndicator';

export default function CommentsList({ comment }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLikedValue, setIsLikedValue] = React.useState(0);

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
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    }
  };

  useEffect(() => {
    if (comment) {
      const isCommentLikedOrDisliked = () => {
        if (comment.likes.includes(currentUser)) return 1;
        if (comment.dislikes.includes(currentUser)) return -1;
        return 0;
      };
      setIsLikedValue(isCommentLikedOrDisliked);
    }
  }, [comment, currentUser]);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        pt: 0,
      }}
    >
      <ListItem
        alignItems="flex-start"
        sx={{
          display: 'flex',
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
            primary={comment.text}
            secondary={(
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.username}
                </Typography>
                {` -  ${getSimpleDate(+comment.date)}`}
              </>
          )}
          />
        </Box>
        <LikesGroupIndicator
          placeLocation="comment"
          isLikedValue={isLikedValue}
          likesCount={comment.likes.length - comment.dislikes.length}
          elementId={comment.id}
          handleLikeOrDislike={handleLikeOrDislike}
          groupSize="sm"
          mt={0}
          ml={6}
        />
      </ListItem>
    </List>
  );
}

CommentsList.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    postId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    dislikes: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string.isRequired,
  }).isRequired,

  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    dislikes: PropTypes.arrayOf(PropTypes.string),
    imageSrc: PropTypes.string,
    date: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      postId: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      likes: PropTypes.arrayOf(PropTypes.string),
      dislikes: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string,
    })),
  }).isRequired,

};
