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
import { useSelector, useDispatch } from 'react-redux';
import getSimpleDate from '../../utils/getSimpleDate';
import SettingCardMenu from '../@extended/SettingCardMenu';
import mainApi from '../../utils/api';
import { addInfo } from '../../store/infoSlice';
import { deletePostById, setLoading, addPost } from '../../store/postsSlice';

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

export default function PostCard({ post, handleOpenModal }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deletePost = async () => {
    try {
      const deleteRequest = await mainApi.deletePost(post.id);
      if (deleteRequest.success) {
        dispatch(addInfo({ message: 'Post deleted successfully', severity: 'info' }));
        dispatch(deletePostById(deleteRequest.result.id));
      }
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    }
  };

  const editPost = async () => {
    handleOpenModal('modalPost', post.id);
  };

  const duplicatePost = async () => {
    dispatch(setLoading(true));
    try {
      const formDataForNewPostBase = {
        title: post.title,
        username: currentUser,
      };
      const responseNewPost = await mainApi.addNewPost(formDataForNewPostBase);
      const newPostId = responseNewPost.result.id;
      const imageFile = await fetch(post.imageSrc);
      const imageBlob = await imageFile.blob();
      const imageFileForUpload = new File([imageBlob], `image-${post.id}.jpg`, { type: 'image/jpeg' });

      const newPostWithImage = await mainApi.uploadImage(newPostId, imageFileForUpload);
      dispatch(addInfo({
        message: 'Post duplicated successfully!',
        severity: 'success',
      }));
      dispatch(addPost(newPostWithImage.result));
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Card sx={{
      width: '100%',
    }}
    >
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.username[0] || 'U'}
          </Avatar>
        )}
        action={(

          <SettingCardMenu
            deletePost={deletePost}
            duplicatePost={duplicatePost}
            editPost={editPost}
          />

        )}
        title={post.title}
        subheader={getSimpleDate(+post.date)}
        titleTypographyProps={{
          sx: {
            width: 'calc(100% - 20px)',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
        }}
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
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit

      >
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
  handleOpenModal: PropTypes.func.isRequired,
};
