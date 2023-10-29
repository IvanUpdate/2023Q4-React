import React from 'react';
import styles from './App.module.css';
import { Search } from './search/search';
import { CharacterItem } from './results/characterItem';
import loader from '../../assets/loader.gif';
import { Character } from '../../types/character';

type AppProps = null;

type AppState = {
  request: string;
  results: Array<Character> | null;
  loading: boolean;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      request: localStorage.getItem('request') || '',
      results: null,
      loading: true,
    };
  }
  
  componentDidMount() {
    this.handleSearch(this.state.request);
  }

  handleSearch = async (request:string) => {
    this.setState({ loading: true });
    const apiUrl = `https://rickandmortyapi.com/api/character/`;
    if (request.trim() === '') {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          this.setState({ results: data.results });
        } else {
          this.setState({ results: null });
          console.error('API request failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      this.setState({ loading: false });
      return;
    }

    try {
      localStorage.setItem('request', request.trim());
      const response = await fetch(`${apiUrl}?name=${request.trim()}`);
      if (response.ok) {
        const data = await response.json();
        this.setState({ results: data.results });
      } else {
        this.setState({ results: null });
        console.error('API request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.search}>
          <Search request={this.state.request} handleSearch = {this.handleSearch}/>
        </div>
        <div className={styles.results}>
          {this.state.loading ? (
            <div className={styles.loader}>
              <img src={loader} />
            </div>
          ) : (this.state.results ? (
            this.state.results.map((person) => {
              return (
                <CharacterItem
                  key={person.id}
                  name={person.name}
                  status={person.status}
                  type={person.type}
                  location={person.location.name}
                  image={person.image}
                  species={person.species}
                />
              );
            })
          ) : (
            <div className={styles.notFound}>
              <p>Sorry, Not Found Results On Your Request</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
