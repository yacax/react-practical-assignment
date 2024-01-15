import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material-next/CircularProgress';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import Feeds from '../feeds/Feeds';
import FloatingCreatePostButton from '../@extended/FloatingCreatePostButton';
import PostModal from '../modals/PostModal';
import { fetchPosts } from '../../store/postsThunks';
import SearchSection from '../@extended/SearchSection';
import Pagination from '../@extended/Pagination';

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
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <BasicLayout handleOpenModal={handleOpenModal}>
      <SearchSection />
      {loading && posts && posts.length < 1 ? (
        <CircularProgress
          color="primary"
          variant="indeterminate"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
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
          <Pagination />
        </>
      )}
    </BasicLayout>
  );
}
