import { useGetCharactersBySearchQuery } from '../../redux/services/rickApi';
import CharacterItem from '../app/results/characterItem';
import styles from './layout.module.css';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { hideDetails } from '../../redux/pageSlice';

const Layout: React.FC = () => {

  const {data} = useGetCharactersBySearchQuery(useAppSelector(state => state.page.search));
  const {pageNumber, pageSize ,isDetailed } = useAppSelector(state => state.page);

  const dispatch = useAppDispatch()

  const startIndex = (pageNumber - 1) * pageSize;
  const lastIndex = pageNumber * pageSize;

  const handleClick = () => {
    dispatch(hideDetails());
  };

  return (
    <div className={isDetailed ? styles.active_main : styles.non_active_main} >
      <div
        className={isDetailed ? styles.non_active_results : styles.active_results}
        onClick={handleClick}
        data-testid="results-container"
      >
        {data && data.results.slice(startIndex, lastIndex).map((person) => (
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
