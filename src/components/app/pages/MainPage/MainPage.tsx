import React, { useEffect } from 'react';
import Search from '../../search/search';
import Loader from '../../../loader/loader';
import Layout from '../../../layout/layout';
import Pagination from '../../../pagination/pagination';
import { Outlet } from 'react-router-dom';
import NotFound from '../notFound/notFound';
import styles from './MainPage.module.css';
import { useGetCharactersBySearchQuery } from '../../../../redux/services/rickApi';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setNumberOfPages } from '../../../../redux/pageSlice';


const MainPage: React.FC = () => {

  const { search } = useAppSelector(store => store.page);

  const {data, isLoading, isFetching} = useGetCharactersBySearchQuery(search);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setNumberOfPages(data?.results.length || 0))
  }, [dispatch, data]);


  return (
    <div className={styles.main}>
      <Search />
      <Pagination />
      <div className={styles.results}>
        {isLoading || isFetching && <Loader />}
        {data?.results && data.results.length > 0 ? (
          <>
            <Layout /> <Outlet />
          </>
        ) : (
          <NotFound />
        )}
      </div>
      <div className={styles.error}>
        {/* <div className={styles.error} onClick={() => setError(new Error())}> */}
        <p>Throw Error</p>
      </div>
    </div>
  );
};

export default MainPage;
