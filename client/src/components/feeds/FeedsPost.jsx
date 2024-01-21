import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './FeedsPost.scss';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import getSimpleDate from '../../utils/getSimpleDate';
import SettingCardMenu from '../@extended/SettingCardMenu';
import mainApi from '../../utils/api';
import { addInfo } from '../../store/infoSlice';
import {
  setLoading,
} from '../../store/postsSlice';
import PopoverComment from '../@extended/PopoverComment';
import { DEFAULT_AVATAR_LETTER } from '../../utils/config';
import getAvatarColor from '../../utils/getAvatarColors';
import LikesGroupIndicator from '../@extended/LikesGroupIndicator';
import { fetchPostUpdate, fetchPostsByPage } from '../../store/postsThunks';
import CommentsList from '../comments/CommentsList';
import ExpandMore from '../@extended/ExpandMore';

export default function FeedsPost({ post, handleOpenModal }) {
  const theme = useTheme();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentPage = useSelector((state) => state.posts.currentPage);
  const totalPages = useSelector((state) => state.posts.totalPages);
  const [isLikedValue, setIsLikedValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [commentsOpeningHeight, setCommentsOpeningHeight] = React.useState(0);
  const dispatch = useDispatch();
  const isOwner = currentUser === post.username || currentUser === 'admin';
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deletePost = async () => {
    try {
      const deleteRequest = await mainApi.deletePost(post.id);
      if (deleteRequest.success) {
        dispatch(fetchPostsByPage({ page: currentPage, getCurrentPage: true }));
        dispatch(addInfo({ message: 'Post deleted successfully', severity: 'info' }));
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
      await mainApi.uploadImage(newPostId, imageFileForUpload);
      dispatch(fetchPostsByPage({ page: totalPages, getLastPage: true }));
      dispatch(addInfo({
        message: 'Post duplicated successfully!',
        severity: 'success',
      }));
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLikeOrDislike = async (type, elementId) => {
    if (!post || !currentUser) return;
    let updatedLikes = [...post.likes];
    let updatedDislikes = [...post.dislikes];

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

    const updatedPost = { ...post, likes: updatedLikes, dislikes: updatedDislikes };
    try {
      await dispatch(fetchPostUpdate({ id: elementId, post: updatedPost }));
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    }
  };

  const commentsListHeight = () => {
    const commentsCount = post.comments.length;
    if (commentsCount > 0 && commentsCount <= 2) return 125 * commentsCount;
    if (commentsCount > 2) return 300;
    return 0;
  };

  useEffect(() => {
    if (post) {
      const isPostLikedOrDisliked = () => {
        if (post.likes.includes(currentUser)) return 1;
        if (post.dislikes.includes(currentUser)) return -1;
        return 0;
      };
      setIsLikedValue(isPostLikedOrDisliked);
      setCommentsOpeningHeight(commentsListHeight());
    }
  }, [post, currentUser]);

  return (
    <Card sx={{
      width: '100%',
      maxHeight: '814px',
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
            isOwner={isOwner}
            deletePost={deletePost}
            duplicatePost={duplicatePost}
            editPost={editPost}
          />
        )}
        title={post.title}
        subheader={getSimpleDate(+post.date)}
        titleTypographyProps={{
          sx: {
            fontSize: '1rem',
            fontWeight: 'bold',
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
        { (post.comments || []).length > 0 ? (
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
          <PopoverComment postId={post.id} />
          <LikesGroupIndicator
            elementId={post.id}
            isLikedValue={isLikedValue}
            likesCount={post ? post.likes.length - post.dislikes.length : 0}
            handleLikeOrDislike={handleLikeOrDislike}
          />

        </Box>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          position: 'relative',
          '&::after': {
            zIndex: 10,
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30px',
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
          },
        }}

      >
        <CardContent
          pb={0}
          sx={{
            overflow: 'auto',
            pt: 0,
            pb: '20px !important',
            maxHeight: `${commentsOpeningHeight}px`,
            '&::-webkit-scrollbar': {
              width: '2px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'none',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '0px',
              background: theme.palette.primary.main,
            },
          }}
        >
          <CommentsList comments={post.comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

FeedsPost.propTypes = {
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
