import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Characters, Character } from '../types/character'

export const rickApi = createApi({
  reducerPath: 'rickApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character/',
  }),
  endpoints: (builder) => ({
    getCharactersBySearch: builder.query<Characters, { search: string; pageNumber: number }>({
      query: (request) =>({
        url: `?name=${request.search}&page=${request.pageNumber}`
      })
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersBySearchQuery, useGetCharacterByIdQuery } = rickApi;