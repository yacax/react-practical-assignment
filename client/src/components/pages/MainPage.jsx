import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import Feeds from '../feeds/Feeds';

export default function MainPage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <BasicLayout>
      <Feeds />
    </BasicLayout>
  );
}
