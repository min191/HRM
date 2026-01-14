import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4 gap-2">
      {pages.map(page => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${page === currentPage ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
