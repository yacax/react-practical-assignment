import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Masonry } from '@mui/lab';
import PostCard from './PostCard';

function Feeds({ handleOpenModal }) {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3 }}
      spacing={2}
      sx={{
        margin: 'auto',
      }}
    >
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} handleOpenModal={handleOpenModal} />
        ))
      ) : (
        <div>No posts available</div>
      )}
    </Masonry>
  );
}

Feeds.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};

export default Feeds;
