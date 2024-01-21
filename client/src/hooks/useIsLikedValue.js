import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useIsLikedValue = (likes, dislikes) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLikedValue, setIsLikedValue] = useState(0);

  useEffect(() => {
    if (!currentUser || !likes || !dislikes) {
      setIsLikedValue(0);
      return;
    }

    const isLiked = likes.includes(currentUser);
    const isDisliked = dislikes.includes(currentUser);

    if (isLiked) {
      setIsLikedValue(1);
    } else if (isDisliked) {
      setIsLikedValue(-1);
    } else {
      setIsLikedValue(0);
    }
  }, [currentUser, likes, dislikes]);

  return isLikedValue;
};

export default useIsLikedValue;
