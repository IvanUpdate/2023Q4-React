import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import styles from './App.module.css';
import { fetchData } from '../../services/data/dataService';

import Search from './search/search';
import Pagination from '../pagination/pagination';
import Loader from '../loader/loader';
import NotFound from './pages/notFound';
import Layout from '../layout/layout';
import Details from './details/details';
import { useAppContext, AppContextProvider } from './AppContext';

const AppContent: React.FC = () => {
  const {
    request,
    setRequest,
    results,
    setResults,
    quantityResults,
    setQuantityResults,
    setQtyPerPage,
    loading,
    setLoading,
    error,
    setError,
    searchParams,
    setSearchParams,
    character,
    setCharacter,
    isColumn,
    setIsColumn,
    currentPage,
    setCurrentPage,
  } = useAppContext();

  const handleSearch = async (request: string) => {
    setIsColumn(false);
    setRequest(request);
    setLoading(true);
    localStorage.setItem('request', request);

    updateSearchParameters(request, 1);

    try {
      const data = await fetchData(request);
      setResults(data);
      setQuantityResults(data.length);
      changePage(1);
      setCurrentPage(1);
    } catch (error) {
      console.error('An error occurred:', error);
    }

    setLoading(false);
  };

  const updateSearchParameters = (search: string, page: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('search', search);
      searchParams.set('page', String(page));
      return searchParams;
    });
  };

  const changeQtyPerPage = (qty: number) => {
    if (qty < quantityResults) {
      setQtyPerPage(qty);
      handleSearch(request);
      setCurrentPage(1);
      setSearchParams((searchParams) => {
        searchParams.set('page', String(1));
        return searchParams;
      });
    }
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams((searchParams) => {
      searchParams.set('page', String(page));
      return searchParams;
    });
  };

  const exitDetails = () => {
    if (isColumn) {
      setIsColumn(false);
      setCharacter(null);
      setSearchParams((searchParams) => {
        searchParams.delete('details');
        return searchParams;
      });
    }
  };

  const changeCharacter = (id: number) => {
    setIsColumn(true);
    setSearchParams((searchParams) => {
      searchParams.set('details', String(id));
      return searchParams;
    });
    console.log(`${id} был вызван ${isColumn} ${character}`);
  };

  useEffect(() => {
    localStorage.setItem('request', request);
  }, [request]);

  useEffect(() => {
    const savedRequest = localStorage.getItem('request');
    if (savedRequest) {
      setRequest(savedRequest);
    }
  }, [setRequest]);

  useEffect(() => {
    localStorage.setItem('currentPage', String(currentPage));
  }, [currentPage]);

  useEffect(() => {
    const savedPage = parseInt(localStorage.getItem('currentPage') || '1', 10);
    setCurrentPage(savedPage);
  }, []);

  useEffect(() => {
    handleSearch(request);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 1;
    setCurrentPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    const detailsParam = searchParams.get('details');
    if (detailsParam && results) {
      setIsColumn(true);
      const characterId = Number(detailsParam);
      const foundCharacter = results?.find((char) => char.id === characterId);
      setCharacter(foundCharacter || null);
    } else {
      setCharacter(null);
    }
  }, [changeCharacter]);

  if (error) throw error;

  return (
    <div className={styles.main}>
      <Search handleSearch={handleSearch} />
      <Pagination changeQtyPerPage={changeQtyPerPage} changePage={changePage} />
      <div className={styles.results}>
        {loading ? (
          <Loader />
        ) : results && results.length > 0 ? (
          <Routes>
            <Route path="/" element={<Layout
                  changeCharacter={changeCharacter}
                  exitDetails={exitDetails}
                />}>
              <Route index element={character ? <Details exitDetails={exitDetails} /> : null}/>
            </Route>
          </Routes>
        ) : (
          <>
            <div className={styles.error} onClick={() => setError(new Error())}>
              <p>Throw Error</p>
            </div>
            {results && results.length === 0 && <NotFound />}
          </>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContextProvider><AppContent /></AppContextProvider>} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;


