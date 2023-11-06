import { Character } from '../../types/character';

export async function fetchData(request: string): Promise<Array<Character>> {
  const allCharacters = [];
  const apiUrl =
    request.trim() === ''
      ? 'https://rickandmortyapi.com/api/character/'
      : `https://rickandmortyapi.com/api/character/?name=${request.trim()}`;

  let nextPage = apiUrl;
  while (nextPage) {
    const response = await fetch(nextPage);
    if (response.ok) {
      const data = await response.json();
      allCharacters.push(...data.results);
      nextPage = data.info.next;
    } else {
      console.error('Error fetching characters');
      break;
    }
  }

  return allCharacters;
}
