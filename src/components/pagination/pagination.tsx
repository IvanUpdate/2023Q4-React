import React, { useState } from 'react';
import styles from './pagination.module.css';
import { Link, useSearchParams } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  quantityOfCharacters: number;
  qtyPerPage: number;
  changePage: (page: number) => void; 
  changeQtyPerPage: (qty: number) => void;
  setCurrentPage: (page: number) => void;
  pageSizeOptions: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  quantityOfCharacters,
  qtyPerPage,
  changeQtyPerPage,
  pageSizeOptions,
  changePage,
}) => {
  const [page, setPage] = useState<number>(currentPage);
  const [selectedValue, setSelectedValue] = useState(qtyPerPage || pageSizeOptions[0]);
  const [searchParams] = useSearchParams();
  const lastPage = Math.ceil(quantityOfCharacters / qtyPerPage);
  const pages = Array.from({ length: lastPage }, (_, index) => index + 1);
  const search = searchParams.get('search') || null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    if (value !== selectedValue) {
      setSelectedValue(value);
      changeQtyPerPage(value);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    changePage(newPage)
  };

  if (quantityOfCharacters <= qtyPerPage) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.select}>
        <label htmlFor="pageSizeSelect">Page size: </label>
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
        {page !== 1 && (
          <Link
            to={search ? `?search=${search}&page=${page - 1}` : `?page=${page - 1}`}
            className={styles.paginationLink}
            onClick={() => handlePageChange(page - 1)}
          >
            <span>Prev</span>
          </Link>
        )}
        {pages.map((pageNumber) => (
          <Link
            to={search ? `?search=${search}&page=${pageNumber}` : `?page=${pageNumber}`}
            key={pageNumber}
            className={page === pageNumber ? styles.active : styles.paginationLink}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Link>
        ))}
        {lastPage !== page && (
          <Link
            to={search ? `?search=${search}&page=${page + 1}` : `?page=${page + 1}`}
            className={styles.paginationLink}
            onClick={() => handlePageChange(page + 1)}
          >
            <span>Next</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;

