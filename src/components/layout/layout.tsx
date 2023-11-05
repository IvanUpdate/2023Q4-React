import React from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Character } from '../../types/character';
import CharacterItem from '../app/results/characterItem';
import styles from './layout.module.css';

type LayoutProps = {
  characters: Array<Character>;
  qtyPerPage: number;
  changeCharacter: (id: number) => void;
};

const Layout: React.FC<LayoutProps> = ({
  characters,
  qtyPerPage,
  changeCharacter,
}) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const startIndex = (page - 1) * qtyPerPage;
  const lastIndex = page * qtyPerPage;

  return (
    <div className={styles.main}>
      <div className={styles.results}>
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
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
