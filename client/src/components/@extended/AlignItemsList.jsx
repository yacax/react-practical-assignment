import * as React from 'react';
import { PropTypes } from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import getSimpleDate from '../../utils/getSimpleDate';
import getAvatarColor from '../../utils/getAvatarColors';
import { DEFAULT_AVATAR_LETTER } from '../../utils/constants';

export default function AlignItemsList({ comment }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: getAvatarColor(comment.username[0]) }} aria-label="recipe">
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
      </ListItem>
    </List>
  );
}

AlignItemsList.propTypes = {
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
