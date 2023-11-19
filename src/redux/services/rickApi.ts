import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Characters, Character } from '../../types/character';

export const rickApi = createApi({
  reducerPath: 'rickApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
  endpoints: (builder) => ({
    // getAllCharacters: builder.query<Characters, void>({
    //   query: () => '',
    // }),
    getCharactersBySearch: builder.query<Characters, string>({
      query: (search: string = '') =>
        search==="" ? '' :`?name=${search.trim()}}`,
    }),
    // getCharactersBySearch: builder.query<Characters, string>({
    //   query: (search: string = '', page: string = '3') =>
    //     `/?name=${search.trim()}&?page=${page}`,
    // }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersBySearchQuery, useGetCharacterByIdQuery } = rickApi;


// export const yourApiSlice = createApi({
//   ...,
//   endpoints: (builder) => ({
//     getListOfthings: builder.query({
//       queryFn: (ids) => {
//         const promises = ids.map((id) => {
//           return someManualFetchFunction(id);
//         });
//         return Promise.all(promises).then((results) => {
//           return { data: results }; // final result must have either the property "data" or the property "error"
//         });
//       },
//     }),
//   }),
// });