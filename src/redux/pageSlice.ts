import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types/character";


type LoadingStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface PageState {
    search: string;
    loadingMain: LoadingStatus;
    loadingDetails: LoadingStatus;
    pageSize: number;
    pageNumber: number;
    numberOfPages: number;
    id: string | null;
    isDetailed: boolean;
    error: Error | null;
    pageCharacters: Array<Character> | null;
}
  
const initialState = { search: '', loadingMain: 'pending', loadingDetails: 'pending', pageSize: 20, pageNumber: 1, numberOfPages:0, isDetailed: false, error: null, id: null, pageCharacters: null  } as PageState

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>){
            return {
                ...state,
                loading: 'pending',
                search: action.payload,
                pageNumber: 1,
                isDetailed: false,
                error: null,
                id: null,
                pageCharacters: null,
            }
        },
        setNumberOfPages(state, action:PayloadAction<number>){
            return {
                ...state,
                numberOfPages: action.payload,
            }
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            return {
                ...state,
                pageNumber: action.payload,
                isDetailed: false,
                error: null,
            };
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.loading = 'pending';
            state.pageSize = action.payload;
            state.pageNumber = 1;
            state.isDetailed = false;
            state.error = null;
            state.id = null;
        },
        showDetails(state, action:PayloadAction<string>) {
            state.isDetailed = true;
            state.error = null;
            state.id = action.payload;
        },
        hideDetails(state) {
            state.isDetailed = false;
            state.error = null;
            state.id = null;
        },
        setError(state, action:PayloadAction<Error | null>) {
            state.error = action.payload;
        },
        setStatusMain(state, action: PayloadAction<LoadingStatus>) {
            state.loadingMain = action.payload
        },
        setStatusDetails(state, action: PayloadAction<LoadingStatus>) {
            state.loadingDetails = action.payload
        },
        setPageCharacters(state, action: PayloadAction<Array<Character>>) {
            state.pageCharacters = action.payload
        },
    },
})

export const {setCurrentPage, setPageSize, showDetails, hideDetails, setError, setSearch, setNumberOfPages, setStatusMain, setStatusDetails, setPageCharacters} = pageSlice.actions;

export default pageSlice.reducer;