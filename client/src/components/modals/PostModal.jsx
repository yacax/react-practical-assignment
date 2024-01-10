import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import mainApi from '../../utils/api';
import useForm from '../../hooks/useForm';
import {
  setLoading,
  addPost,
  changePostById,
} from '../../store/postsSlice';
import { addInfo } from '../../store/infoSlice';

function NewPostModal({
  openModal, handleCloseModal, postId,
}) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentPost = useSelector((state) => state.posts.posts.find((post) => post.id === postId));

  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();

  const formInitialValues = {
    name: currentUser || '',
    title: currentPost ? currentPost.title : '',
    image: null,
  };

  const {
    form, errors, isFormValid, handleChange, resetForm,
    resetValue,
  } = useForm(
    formInitialValues,
  );

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (currentPost) {
      resetForm();
    }
  }, [currentPost]);

  const handleClose = () => {
    resetForm({
      name: '',
      title: '',
      image: null,
    });
    handleCloseModal('modalPost');
  };

  const handleCancelClose = () => {
    handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    if (!postId) {
      try {
        const formDataForNewPostBase = {
          title: form.title,
          username: form.name || currentUser,
        };
        const responseNewPost = await mainApi.addNewPost(formDataForNewPostBase);
        const newPostId = responseNewPost.result.id;
        let newPostWithImage = null;
        if (form.image) {
          newPostWithImage = await mainApi.uploadImage(newPostId, form.image);
        }
        resetForm();
        dispatch(addInfo({
          message: 'New post successfully created!',
          severity: 'success',
        }));
        dispatch(addPost(newPostWithImage ? newPostWithImage.result : { comments: [], imageSrc: '', ...responseNewPost.result }));
        handleClose();
      } catch (error) {
        dispatch(addInfo({ message: error.message, severity: 'error' }));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      try {
        if (form.title !== formInitialValues.title) {
          const responseEditPost = await mainApi.updatePost(postId, { title: form.title });
          dispatch(changePostById({
            id: responseEditPost.result.id,
            updates: { title: responseEditPost.result.title },
          }));
        }
        if (form.image) {
          const responseChangeImage = await mainApi.uploadImage(postId, form.image);
          dispatch(changePostById({
            id: responseChangeImage.result.id,
            updates: { imageSrc: responseChangeImage.result.imageSrc },
          }));
        }
        dispatch(addInfo({
          message: 'Post successfully updated!',
          severity: 'success',
        }));
        resetForm(
          {
            name: '',
            title: '',
            image: null,
          },
        );
        handleClose();
      } catch (error) {
        dispatch(addInfo({ message: error.message, severity: 'error' }));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const deleteImage = () => {
    resetValue('image');
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  useEffect(() => {
    if (form.image && form.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(form.image);
    } else if (postId) {
      setImagePreview(currentPost.imageSrc);
    } else {
      setImagePreview(null);
    }
  }, [form.image, postId]);

  const imagePreviewStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  };

  const imageStyle = {
    width: '100%',
    maxHeight: '20vh',
    objectFit: 'cover',
    '@media (minWidth: 600px)': {
      width: '50%',
    },
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
    >
      <DialogTitle>{postId ? 'Edit post' : 'Add a new post' }</DialogTitle>
      <DialogContent
        sx={{
          minWidth: {
            xs: 'calc(90vw - 60px)',
            sm: 'calc(60vw - 40px)',
            md: '500px',
          },
        }}
      >
        <form
          onSubmit={handleSubmit}
          id="postForm"
        >
          <TextField
            label="Title"
            variant="standard"
            fullWidth
            required
            multiline
            maxRows={3}
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title || ' '}
            margin="normal"
            autoFocus
            FormHelperTextProps={{
              style: { minHeight: '1em' },
            }}
            inputProps={
              {
                maxLength: 150,
              }
            }
          />
          <div style={imagePreviewStyle}>
            {imagePreview && <img src={imagePreview} alt="Preview" style={imageStyle} />}
          </div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            { (!form.image && !imagePreview)

              ? (
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    justifySelf: 'center',
                  }}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleChange}
                  />
                </Button>
              ) : (
                <Box
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  { postId && (
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    startIcon={<ChangeCircleIcon />}
                    sx={{
                      justifySelf: 'center',
                      m: 1,
                      width: {
                        xs: '100%',
                        md: '180px',
                      },
                    }}
                  >
                    Change picture
                    <VisuallyHiddenInput
                      type="file"
                      name="image"
                      id="imageNew"
                      onChange={handleChange}
                    />
                  </Button>
                  )}
                  { !postId && (
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    onClick={deleteImage}
                    startIcon={<DeleteIcon />}
                    sx={{
                      justifySelf: 'center',
                      m: 1,
                      width: {
                        xs: '100%',
                        md: '180px',
                      },
                    }}
                  >
                    {' '}
                    Delete picture
                  </Button>
                  )}

                </Box>
              )}
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClose}>Cancel</Button>
        <LoadingButton
          {...postId && { startIcon: <SaveAltIcon /> }}
          {...!postId && { endIcon: <SendIcon /> }}
          loading={loading}
          loadingPosition={postId ? 'start' : 'end'}
          type="submit"
          form="postForm"
          disabled={!isFormValid}
          sx={{
            mr: 1,
          }}
        >
          {!postId ? 'Add post' : 'Save' }
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

NewPostModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  postId: PropTypes.number,
};

NewPostModal.defaultProps = {
  postId: null,
};

export default NewPostModal;
