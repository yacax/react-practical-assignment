import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import CommentCard from './CommentsCard';

function CommentsList({ comments }) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        pt: 0,
        pb: 0,
      }}
    >
      {comments.map((comment, id) => (
        <CommentCard
          key={comment.id}
          id={id}
          commentsLength={comments.length}
          comment={comment}
          sx={{
            pt: 0,
            pb: 0,
          }}
        />
      ))}
    </List>
  );
}

export default CommentsList;

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    postId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    dislikes: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
  })).isRequired,

};
