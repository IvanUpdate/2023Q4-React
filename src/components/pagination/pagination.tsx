import { useState } from 'react';
import styles from './pagination.module.css';
import { Link, useSearchParams } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  quantityOfCharacters: number;
  qtyPerPage: number;
  changeQtyPerPage: (qty: number) => void;
  changePage: (page: number) => void;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  quantityOfCharacters,
  qtyPerPage,
  changeQtyPerPage,
  setCurrentPage,
}) => {
  const [page, setPage] = useState<number>(currentPage);
  const [selectedValue, setSelectedValue] = useState(qtyPerPage || 20);
  const [searchParams] = useSearchParams();
  const lastPage = Math.ceil(quantityOfCharacters / qtyPerPage);
  const pages = [];
  for (let i = 1; i <= lastPage; i++) {
    pages.push(i);
  }
  const search = searchParams.get('search') || null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== String(selectedValue)) {
      const val = Number(e.target.value);
      setSelectedValue(val);
      changeQtyPerPage(val);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setPage(newPage);
  };

  if (quantityOfCharacters <= qtyPerPage) {
    return false;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.select}>
        <label>Page size: </label>
        <select value={selectedValue} onChange={handleChange}>
          <option value={20}>20</option>
          <option value={10}>10</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className={styles.pages}>
        <span>Pages: </span>
        {currentPage !== 1 && (
          <Link
            to={
              search
                ? `?search=${search}&page=${page - 1}`
                : `?page=${page - 1}`
            }
            className={styles.pages}
            onClick={() => handlePageChange(page - 1)}
          >
            <span>Prev</span>
          </Link>
        )}
        {pages.map((page) => (
          <Link
            to={search ? `?search=${search}&page=${page}` : `?page=${page}`}
            key={page}
            className={currentPage === page ? styles.active : styles.pages}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Link>
        ))}
        {lastPage !== currentPage && (
          <Link
            to={
              search
                ? `?search=${search}&page=${page + 1}`
                : `?page=${page + 1}`
            }
            className={styles.pages}
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
