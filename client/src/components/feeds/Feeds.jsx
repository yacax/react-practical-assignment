import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Masonry } from '@mui/lab';
import { Container, Typography } from '@mui/material';
import FeedsPost from './FeedsPost';
import Pagination from '../@extended/Pagination';

function Feeds({ handleOpenModal }) {
  const posts = useSelector((state) => state.posts.posts);
  const totalPages = useSelector((state) => state.posts.totalPages);
  const searchPosts = useSelector((state) => state.search.postsFinded);
  const nothingFound = useSelector((state) => state.search.nothingFound);
  const count = useSelector((state) => state.posts.totalPages) || 0;
  const page = useSelector((state) => state.posts.currentPage) || 1;

  const displayedPosts = useMemo(() => {
    if (searchPosts && searchPosts.length > 0 && !nothingFound) {
      return searchPosts;
    }
    if (posts && posts.length > 0 && !nothingFound) {
      return posts;
    }
    if (nothingFound) {
      return [];
    }
    return [];
  }, [posts, searchPosts, nothingFound]);

  return (
    <>
      <Masonry
        columns={{ xs: 1, md: 2, lg: 3 }}
        spacing={2}
        sx={{ mx: 'auto' }}
      >
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <FeedsPost key={post.id} post={post} handleOpenModal={handleOpenModal} />
          ))
        ) : (
          <Container>
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', margin: 'auto' }}
            >
              Nothing found
            </Typography>
          </Container>
        )}
      </Masonry>
      { !nothingFound
      && totalPages > 1
      && !searchPosts.length > 0
      && <Pagination count={count} page={page} />}
    </>
  );
}

Feeds.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
};

export default Feeds;
