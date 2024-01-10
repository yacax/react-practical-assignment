import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Box } from '@mui/material';
import useForm from '../../hooks/useForm';
import mainApi from '../../utils/api';
import { addInfo } from '../../store/infoSlice';
import { addComment } from '../../store/postsSlice';

export default function PopoverAddComment({ postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const formInitialValues = {
    text: '',
    postId,
    username: currentUser,
  };

  const {
    form, isFormValid, handleChange, addValue,
  } = useForm(
    formInitialValues,
  );
  const addEmoji = (emoji) => () => addValue('text', `${form.text}${emoji}`);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const createComment = await mainApi.createComment(form);
      dispatch(addInfo({
        message: 'Comment added successfully!',
        severity: 'success',
      }));
      dispatch(addComment(createComment.result));
    } catch (error) {
      dispatch(addInfo({
        message: error.message,
        severity: 'error',
      }));
    }

    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          pb: 0,
        }}
      >
        <AddCommentIcon />
      </IconButton>
      <Popover
        onSubmit={handleCommentSubmit}
        component="form"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

        <Textarea
          name="text"
          id="text"
          value={form.text}
          onChange={handleChange}
          minRows={2}
          maxRows={4}
          placeholder="your comment..."
          size="sm"
          variant="solid"
          color="paper"
          startDecorator={(
            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                👍
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                🏖
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                😍
              </IconButton>
              <Button
                type="submit"
                size="medium"
                color="secondary"
                variant="contained"
                disabled={!isFormValid}
                endIcon={(
                  <SendIcon
                    sx={{ ml: '-8px', p: 0 }}
                  />
            )}
                sx={{
                  ml: 'auto',
                  height: '35px',
                  width: '35px',
                  minWidth: '35px',
                }}
              />
            </Box>
          )}
          endDecorator={(
            <Typography level="body-xs" sx={{ ml: 'auto' }}>
              {form.text.length}
              {' '}
              character(s)
            </Typography>
          )}
          sx={{ minWidth: 300 }}
        />

      </Popover>
    </Box>
  );
}

PopoverAddComment.propTypes = {
  postId: PropTypes.number.isRequired,
};
