import { useGetCharactersBySearchQuery } from '../../redux/services/rickApi';
import CharacterItem from '../app/results/characterItem';
import styles from './layout.module.css';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { hideDetails, setPageCharacters, setStatusMain } from '../../redux/pageSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {

  const {search, pageNumber, pageSize ,isDetailed } = useAppSelector(state => state.page);
  const request = {
    search: search ,
    pageNumber: pageNumber
  }
  const {data, isLoading, isSuccess} = useGetCharactersBySearchQuery(request);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    isDetailed && dispatch(hideDetails());
    isDetailed && navigate(-1);
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatusMain('pending'));
    } else if (!data) {
      dispatch(setStatusMain('rejected'));
    } else if (data) {
      dispatch(setStatusMain('fulfilled'));
    }
  }, [isLoading, data, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPageCharacters(data.results));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className={isDetailed ? styles.active_main : styles.non_active_main} >
      <div
        className={isDetailed ? styles.non_active_results : styles.active_results}
        onClick={handleClick}
        data-testid="results-container"
      >
        {data && data.results.slice(0,pageSize).map((person) => (
          <CharacterItem
            key={person.id}
            id={person.id}
            name={person.name}
            status={person.status}
            type={person.type}
            location={person.location.name}
            image={person.image}
            species={person.species}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;

