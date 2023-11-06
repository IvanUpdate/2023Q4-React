import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import Search from './search/search';
import { Character } from '../../types/character';
import { fetchData } from '../../services/data/dataService';
import Pagination from '../pagination/pagination';
import Loader from '../loader/loader';
import NotFound from './pages/notFound';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import Layout from '../layout/layout';
import Details from './details/details';

const App: React.FC = () => {
  const [request, setRequest] = useState<string>(
    localStorage.getItem('request') || ''
  );
  const [results, setResults] = useState<Array<Character> | null>(null);
  const [quantityResults, setQuantityResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [qtyPerPage, setQtyPerPage] = useState<number>(20);
  const [searchParams, setSearchParams] = useSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isColumn, setIsColumn] = useState<boolean>(false);

  const currentPage = Number(searchParams.get('page')) || 1;

  const handleSearch = async (request: string) => {
    setIsColumn(false);
    setRequest(request);
    setLoading(true);
    localStorage.setItem('request', request);

    if (request.trim() !== '') {
      setSearchParams({ search: request });
    }

    try {
      const data = await fetchData(request);
      setResults(data);
      setQuantityResults(data.length);
    } catch (error) {
      console.error('An error occurred:', error);
    }

    setLoading(false);
    console.log(results);
  };

  const changeQtyPerPage = (qty: number) => {
    if (qty < quantityResults) {
      setIsColumn(false);
      setQtyPerPage(qty);
      handleSearch(request);
    }
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

  const changeCharackter = (id: number) => {
    setIsColumn(true);
    setSearchParams((searchParams) => {
      searchParams.set('details', String(id));
      return searchParams;
    });
  };

  useEffect(() => {
    handleSearch(request);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  useEffect(() => {
    const detailsParam = searchParams.get('details');
    if (detailsParam) {
      setIsColumn(true);
      const characterId = Number(detailsParam);
      const foundCharacter = results?.find((char) => char.id === characterId);
      setCharacter(foundCharacter || null);
    } else {
      setCharacter(null);
    }
  }, [searchParams, results]);

  if (error) throw error;

  return (
    <div className={styles.main}>
      <Search request={request} handleSearch={handleSearch} />
      <Pagination
        currentPage={currentPage}
        quantityOfCharacters={quantityResults}
        qtyPerPage={qtyPerPage}
        changeQtyPerPage={changeQtyPerPage}
      />
      <div className={styles.results}>
        {loading ? (
          <Loader />
        ) : results && results.length > 0 ? (
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  characters={results}
                  qtyPerPage={qtyPerPage}
                  changeCharacter={changeCharackter}
                  isColumn={isColumn}
                  exitDetails={exitDetails}
                />
              }
            >
              <Route
                index
                element={
                  character ? (
                    <Details character={character} exitDetails={exitDetails} />
                  ) : null
                }
              />
            </Route>
          </Routes>
        ) : null}
        {results && results.length === 0 && <NotFound />}
        <div className={styles.error} onClick={() => setError(new Error())}>
          <p>Throw Error</p>
        </div>
      </div>
    </div>
  );
};

export default App;
