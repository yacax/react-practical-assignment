import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import Feeds from '../feeds/Feeds';
import FloatingCreatePostButton from '../@extended/FloatingCreatePostButton';
import PostModal from '../modals/PostModal';
import mainApi from '../../utils/api';
import { addPosts } from '../../store/postsSlice';
import { addInfo } from '../../store/infoSlice';

export default function MainPage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
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
    mainApi.getPostsByPage().then((response) => {
      console.log(response);
      dispatch(addPosts(response.result));
    }).catch((error) => {
      dispatch(addInfo({ message: error.message, severity: 'error' }));
    });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <BasicLayout>
      <Feeds handleOpenModal={handleOpenModal} />
      <FloatingCreatePostButton handleOpenModal={handleOpenModal} />
      <PostModal
        openModal={openModal.modalPost}
        postId={openModal.postId}
        handleCloseModal={handleCloseModal}
      />
    </BasicLayout>
  );
}
