import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';

function Feeds({ handleOpenModal }) {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <Grid container spacing={2} mt="0">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} handleOpenModal={handleOpenModal} />
          </Grid>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </Grid>
  );
}

Feeds.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};

export default Feeds;
