import React from 'react';
import { Button } from '@material-ui/core';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
