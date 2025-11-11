import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { authApiSlice } from "../features/auth/authApiSlice";
import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"], // optional: persist only needed parts
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer), // only auth is persisted
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable due to redux-persist
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
