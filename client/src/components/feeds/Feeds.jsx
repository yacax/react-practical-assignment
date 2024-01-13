import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Masonry } from '@mui/lab';
import { Container, Typography } from '@mui/material';
import FeedsPost from './FeedsPost';

function Feeds({ handleOpenModal }) {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <Masonry
      columns={{
        xs: 1, md: 2, lg: 3,
      }}
      spacing={2}
      sx={{
        margin: 'auto',
      }}
    >
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <FeedsPost key={post.id} post={post} handleOpenModal={handleOpenModal} />
        ))
      ) : (
        <Container>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              margin: 'auto',
            }}
          >
            No posts available
          </Typography>
        </Container>
      )}
    </Masonry>
  );
}

Feeds.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};

export default Feeds;
