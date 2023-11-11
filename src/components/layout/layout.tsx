import { Outlet } from 'react-router-dom';
import CharacterItem from '../app/results/characterItem';
import styles from './layout.module.css';
import { useAppContext } from '../app/AppContext';

type LayoutProps = {
  changeCharacter: (id: number) => void;
  exitDetails: () => void;
};

const Layout: React.FC<LayoutProps> = ({
  changeCharacter,
  exitDetails,
}) => {
  const {
    qtyPerPage,
    searchParams,
    isColumn,
    results,
  } = useAppContext();

  const page = Number(searchParams.get('page')) || 1;
  const startIndex = (page - 1) * qtyPerPage;
  const lastIndex = page * qtyPerPage;

  const handleClick = () => {
    console.log('Clicked on the element');
    exitDetails();
  };

  return (
    <div className={isColumn ? styles.active_main : styles.non_active_main}>
      <div
        className={isColumn ? styles.non_active_results : styles.active_results}
        onClick={handleClick}
      >
        {results && results.slice(startIndex, lastIndex).map((person) => (
          <CharacterItem
            key={person.id}
            id={person.id}
            name={person.name}
            status={person.status}
            type={person.type}
            location={person.location.name}
            image={person.image}
            species={person.species}
            changeCharacter={changeCharacter}
          />
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
