import { Outlet, useSearchParams } from 'react-router-dom';
import { Character } from '../../types/character';
import CharacterItem from '../app/results/characterItem';
import styles from './layout.module.css';

type LayoutProps = {
  characters: Array<Character>;
  qtyPerPage: number;
  changeCharacter: (id: number) => void;
  isColumn: boolean;
  exitDetails: () => void;
};

const Layout: React.FC<LayoutProps> = ({
  characters,
  qtyPerPage,
  changeCharacter,
  isColumn,
  exitDetails,
}) => {
  const [searchParams] = useSearchParams();

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
        {characters.slice(startIndex, lastIndex).map((person) => (
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
