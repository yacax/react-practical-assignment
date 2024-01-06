import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';

function Feeds() {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Feeds;
