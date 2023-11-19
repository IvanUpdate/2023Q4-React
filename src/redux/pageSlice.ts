import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface PageState {
    search: string;
    loading: 'pending' | 'fulfilled' | 'rejected';
    pageSize: number;
    pageNumber: number;
    numberOfPages: number;
    id: string | null;
    isDetailed: boolean;
    error: Error | null;
}
  
const initialState = { search: '', loading: 'pending', pageSize: 25, pageNumber: 1, numberOfPages:0, isDetailed: false, error: null, id: null  } as PageState

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>){
            return {
                ...state,
                search: action.payload,
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
                currentPageNumber: action.payload,
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
        }
    },
})

export const {setCurrentPage, setPageSize, showDetails, hideDetails, setError, setSearch, setNumberOfPages} = pageSlice.actions;

export default pageSlice.reducer;