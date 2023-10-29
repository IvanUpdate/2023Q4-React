import React from 'react';
import styles from './App.module.css';
import { Search } from './search/search';
import { Character } from './results/character';

class App extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.search}><Search request="aero" /></div>    
        <div className={styles.results}>
          <Character name="Rick" status='alive' type='' location='Earth' image="https://rickandmortyapi.com/api/character/avatar/1.jpeg" />
        </div>
      </div>
    );
  }
}

export default App;
