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
import mainApi from '../../utils/api';
import useForm from '../../hooks/useForm';
import {
  setLoading,
  addPost,
} from '../../store/postsSlice';
import { addInfo } from '../../store/infoSlice';

function EditPostModal({
  openModal, handleCloseModal, postId,
}) {
  console.log('EditPostModal', postId);
  const currentUser = useSelector((state) => state.user.currentUser);
  // const currentPost = useSelector((state) =>
  // state.posts.posts.find((post) => post.id === postId));
  // console.log('currentPost', currentPost);
  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();
  const {
    form, errors, isFormValid, handleChange, resetForm,
    resetValue,
  } = useForm({
    name: currentUser || '',
    title: '',
    text: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleClose = () => {
    handleCloseModal('modalEditPost');
  };

  const handleCancelClose = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    try {
      const formDataForNewPostBase = {
        title: form.title,
        username: form.name,
      };
      const responseNewPost = await mainApi.addNewPost(formDataForNewPostBase);
      // const newPost = responseNewPost.result;
      const newPostId = responseNewPost.result.id;
      const newPostWithImage = await mainApi.uploadImage(newPostId, form.image);
      resetForm();
      dispatch(addInfo({
        message: 'New post successfully created!!',
        severity: 'success',
      }));
      dispatch(addPost(newPostWithImage.result));
      handleClose();
    } catch (error) {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    } finally {
      dispatch(setLoading(false));
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
    } else {
      setImagePreview(null);
    }
  }, [form.image]);

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
    <div>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Edit post</DialogTitle>
        <DialogContent ssx={{
          minWidth: {
            xs: 'calc(100vw - 60px)',
            sm: 'calc(60vw - 60px)',
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
              required
              id="title"
              value={form.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title || ' '}
              name="title"
              margin="normal"
              fullWidth
              autoFocus
              FormHelperTextProps={{
                style: { minHeight: '1em' },
              }}
            />

            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="text"
              label="Text"
              name="text"
              value={form.text}
              onChange={handleChange}
              error={!!errors.text}
              helperText={errors.text || ' '}
              FormHelperTextProps={{
                style: { minHeight: '1em' },
              }}
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
              { !form.image

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
                    <VisuallyHiddenInput type="file" name="image" id="image" onChange={handleChange} />
                  </Button>
                ) : (

                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    onClick={deleteImage}
                    startIcon={<DeleteIcon />}
                    sx={{
                      justifySelf: 'center',
                    }}
                  >
                    {' '}
                    Delete picture
                  </Button>

                )}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>Cancel</Button>
          <LoadingButton
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            type="submit"
            form="postForm"
            disabled={!isFormValid}
          >
            Add post
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditPostModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  postId: PropTypes.number,
};

EditPostModal.defaultProps = {
  postId: '',
};

export default EditPostModal;
