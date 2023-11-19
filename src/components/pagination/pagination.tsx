import React, { useState } from 'react';
import styles from './pagination.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { setCurrentPage, setPageSize } from '../../redux/pageSlice';
import { useGetCharactersBySearchQuery } from '../../redux/services/rickApi';

const Pagination: React.FC = () => {

  const {pageNumber, pageSize, search} = useAppSelector(state => state.page);
  const {data, isSuccess} = useGetCharactersBySearchQuery({search, pageNumber}); 
  const dispatch = useAppDispatch();

  const pageSizeOptions =[20,10,5];
  const [selectedValue, setSelectedValue] = useState(pageSize || pageSizeOptions[0]);
  const numberOfPages = data?.info.pages || 0;
  const pages = Array.from({ length: numberOfPages || 0 }, (_, index) => index + 1);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    if (value !== selectedValue) {
      dispatch(setPageSize(value))
      setSelectedValue(value);
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  if (numberOfPages <= 1 || !isSuccess) {
    return false;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.select}>
        <label htmlFor="pageSizeSelect" data-testid="page-size">Page size: </label>
        <select id="pageSizeSelect" value={selectedValue} onChange={handleChange}>
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.pages}>
        <span>Pages: </span>
        {pageNumber !== 1 && (
          <Link
            to={search ? `?search=${search}&page=${pageNumber - 1}` : `?page=${pageNumber - 1}`}
            className={styles.paginationLink}
            onClick={() => handlePageChange(pageNumber - 1)}
            data-testid="pagination-link" 
          >
            <span>Prev</span>
          </Link>
        )}
        {pages.map((page) => (
          <Link
            to={search ? `?search=${search}&page=${page}` : `?page=${page}`}
            key={page}
            className={page === pageNumber ? styles.active : styles.paginationLink}
            onClick={() => handlePageChange(page)}
            data-testid="pagination-link" 
          >
            {page}
          </Link>
        ))}
        {numberOfPages !== pageNumber && (
          <Link
            to={search ? `?search=${search}&page=${pageNumber + 1}` : `?page=${pageNumber + 1}`}
            className={styles.paginationLink}
            onClick={() => handlePageChange(pageNumber + 1)}
            data-testid='next' 
          >
            <span>Next</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;

