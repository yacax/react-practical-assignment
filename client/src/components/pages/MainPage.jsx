import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material-next/CircularProgress';
import { Box } from '@mui/material';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import Feeds from '../feeds/Feeds';
import FloatingCreatePostButton from '../@extended/FloatingCreatePostButton';
import PostModal from '../modals/PostModal';
import { fetchPostsByPage } from '../../store/postsThunks';
import SearchSection from '../@extended/SearchSection';

export default function MainPage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.posts.loading);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(
    {
      modalPost: false,
      postId: null,
    },
  );

  const handleOpenModal = (modal, postId = null) => {
    setOpenModal((cur) => ({ ...cur, [modal]: true, postId }));
  };

  const handleCloseModal = (modal) => {
    setOpenModal((cur) => ({ ...cur, [modal]: false, postId: null }));
  };

  useEffect(() => {
    dispatch(fetchPostsByPage({ page: 1 }));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <BasicLayout handleOpenModal={handleOpenModal}>
      <Box sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 56px - 53px)',
      }}
      >
        <SearchSection />
        {loading && posts && posts.length < 1
          ? (
            <CircularProgress
              color="primary"
              variant="indeterminate"
              sx={{
                position: 'absolute',
                top: '50%',
                left: 'calc(50% - 24px) !important',
              }}
            />
          ) : (
            <>
              <Feeds handleOpenModal={handleOpenModal} />
              <FloatingCreatePostButton handleOpenModal={handleOpenModal} />
              <PostModal
                openModal={openModal.modalPost}
                postId={openModal.postId}
                handleCloseModal={handleCloseModal}
              />
            </>
          )}
      </Box>
    </BasicLayout>
  );
}
