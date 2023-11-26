import { configureStore } from "@reduxjs/toolkit";
import { rickApi } from "../api/api";
import pageReducer from "../api/pageSlice"

const store = configureStore({
    reducer: {
        [rickApi.reducerPath]: rickApi.reducer,
        page: pageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickApi.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;