import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.css';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  quantityOfCharacters: number;
  qtyPerPage: number;
  changeQtyPerPage: (qty: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  quantityOfCharacters,
  qtyPerPage,
  changeQtyPerPage,
}) => {
  const [page, setPage] = useState<number>(currentPage);
  const [selectedValue, setSelectedValue] = useState(qtyPerPage || 20);
  const [, setSearchParams] = useSearchParams();
  const lastPage = Math.ceil(quantityOfCharacters / qtyPerPage);
  const pages = [];
  for (let i = 1; i <= lastPage; i++) {
    pages.push(i);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== String(selectedValue)) {
      const val = Number(e.target.value);
      setSelectedValue(val);
      changeQtyPerPage(val);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', String(Number));
      searchParams.delete('details');
      return searchParams;
    });
    //navigate(`?page=${newPage}`);
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
            to={`?page=${page - 1}`}
            className={styles.pages}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </Link>
        )}
        {pages.map((page) => (
          <Link
            to={`?page=${page}`}
            key={page}
            className={currentPage === page ? styles.active : styles.pages}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Link>
        ))}
        {lastPage !== currentPage && (
          <Link
            to={`?page=${page + 1}`}
            className={styles.pages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
