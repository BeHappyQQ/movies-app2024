import React from 'react';
import { Pagination } from 'antd';

const MoviesPagination = ({ currentPage, totalPages, onPageChange }) => {
  const onChange = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination current={currentPage} 
                onChange={onChange} 
                total={totalPages}
                showSizeChanger = {false} />)
};

export default MoviesPagination;
