import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchPostsByPage } from '../../store/postsThunks';

export default function BasicPagination() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.posts.totalPages) || 0;
  const page = useSelector((state) => state.posts.currentPage) || 1;

  const handleChangePagination = (event, newPage) => {
    event.preventDefault();
    dispatch(fetchPostsByPage({ page: newPage }));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      {count && <Pagination count={count} color="primary" page={page} onChange={handleChangePagination} />}
    </Stack>
  );
}
