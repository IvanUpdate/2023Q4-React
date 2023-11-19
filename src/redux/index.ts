import { configureStore } from "@reduxjs/toolkit";
import { rickApi } from "./services/rickApi";
import pageReducer from "./pageSlice";

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
