import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({ post }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={post.title}
        subheader={new Date(post.date).toString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.imageSrc}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.username}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments</Typography>
          <Typography paragraph>
            {post.comments.map((comment) => (
              <Typography key={comment.id}>
                {comment.username}
                :
                {comment.text}
              </Typography>
            ))}
          </Typography>
          <Typography paragraph>
            {post.likes.length}
          </Typography>
          <Typography paragraph>
            {post.dislikes.length}
          </Typography>
          <Typography>
            {post.comments.length}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    dislikes: PropTypes.arrayOf(PropTypes.string),
    imageSrc: PropTypes.string,
    date: PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      postId: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      likes: PropTypes.arrayOf(PropTypes.string),
      dislikes: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.number,
    })),
  }).isRequired,
};
