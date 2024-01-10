import * as React from 'react';
import PropTypes from 'prop-types';
import './PostCard.scss';
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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import getSimpleDate from '../../utils/getSimpleDate';
import SettingCardMenu from '../@extended/SettingCardMenu';
import mainApi from '../../utils/api';
import { addInfo } from '../../store/infoSlice';
import { deletePostById, setLoading, addPost } from '../../store/postsSlice';
import PopoverAddComment from '../@extended/PopoverAddComment';
import AlignItemsList from '../@extended/AlignItemsList';
import { DEFAULT_AVATAR_LETTER } from '../../utils/constants';
import getAvatarColor from '../../utils/getAvatarColors';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <Box display="flex">

      <Typography
        display="block"
        variant="body2"
        color="text.secondary"
        ml={1}
        sx={{
          alignSelf: 'center',
        }}
      >
        Comments
      </Typography>
      <IconButton {...other} />
    </Box>
  );
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
  const [likes, setLikes] = React.useState({ like: false, dislike: false, count: 0 });
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

  React.useEffect(() => {
    setLikes((prev) => ({
      ...prev,
      count: 5,
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
    <Card sx={{
      width: '100%',
      overflow: 'auto',
      maxHeight: '560px',
    }}
    >
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: getAvatarColor(post.username[0]) }} aria-label="recipe">
            {post.username[0] || DEFAULT_AVATAR_LETTER}
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
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
        }}
      />
      { post.imageSrc && (
      <CardMedia
        component="img"
        height="194"
        image={post.imageSrc}
        alt={post.title}
      />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.username}
        </Typography>

      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >

        {post.comments.length > 0 ? (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />

          </ExpandMore>
        ) : (
          <Typography variant="body2" color="text.secondary" ml={1}>
            No comments yet
          </Typography>
        )}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <PopoverAddComment postId={post.id} />

          <IconButton aria-label="Like">
            {likes.like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </IconButton>
          <Typography variant="subtitle" color={getLikeColour(likes.count)}>
            {likes.count}
          </Typography>
          <IconButton aria-label="Dislike">
            {likes.dislike ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
          </IconButton>

        </Box>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit

      >
        <CardContent
          sx={{
            overflow: 'auto',
          }}
        >
          {post.comments.map((comment) => (
            <AlignItemsList comment={comment} key={comment.id} />
          ))}
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
