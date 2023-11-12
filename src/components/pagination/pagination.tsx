import React, { useState } from 'react';
import styles from './pagination.module.css';
import { Link } from 'react-router-dom';
import { useAppContext } from '../app/AppContext';

interface PaginationProps {
  changePage: (page: number) => void; 
  changeQtyPerPage: (qty: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  changeQtyPerPage,
  changePage,
}) => {

  const {
    currentPage,
    qtyPerPage,
    quantityResults,
    searchParams,
    setCurrentPage,
  } = useAppContext();

  const pageSizeOptions =[20,10,5];
  //const [page, setPage] = useState<number>(currentPage);
  const [selectedValue, setSelectedValue] = useState(qtyPerPage || pageSizeOptions[0]);
  const lastPage = Math.ceil(quantityResults / qtyPerPage);
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
    setCurrentPage(newPage);
    changePage(newPage)
  };

  if (quantityResults <= qtyPerPage) {
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
        {currentPage !== 1 && (
          <Link
            to={search ? `?search=${search}&page=${currentPage - 1}` : `?page=${currentPage - 1}`}
            className={styles.paginationLink}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span>Prev</span>
          </Link>
        )}
        {pages.map((pageNumber) => (
          <Link
            to={search ? `?search=${search}&page=${pageNumber}` : `?page=${pageNumber}`}
            key={pageNumber}
            className={currentPage === pageNumber ? styles.active : styles.paginationLink}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Link>
        ))}
        {lastPage !== currentPage && (
          <Link
            to={search ? `?search=${search}&page=${currentPage + 1}` : `?page=${currentPage + 1}`}
            className={styles.paginationLink}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span>Next</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;

