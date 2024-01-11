import * as React from 'react';
import { PropTypes } from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import getSimpleDate from '../../utils/getSimpleDate';
import getAvatarColor from '../../utils/getAvatarColors';
import { DEFAULT_AVATAR_LETTER } from '../../utils/constants';
import LikesGroup from './LikesGroup';

export default function CommentsList({ comment }) {
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
        <LikesGroup
          likesQuantity={comment.likes ? comment.likes.length : 0}
          dislikesQuantity={comment.dislikes ? comment.dislikes.length : 0}
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
};
