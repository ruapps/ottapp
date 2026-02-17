import { configureStore } from "@reduxjs/toolkit";
import savedReducer from "./favAsyncSlice";
import carouselReducer from "./carouselSlice";
import moviesReducer from "./moviesSlice";
import playerReducer from "./playerSlice";
import searchBarReducer from "./searchBarSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import labelReducer from "./labelSlice";
import signupReducer from "./signupSlice";
import loginReducer from "./loginSlice";

const rootReducer = combineReducers({
  saved: savedReducer,
  carousel: carouselReducer,
  movies: moviesReducer,
  player: playerReducer,
  serchedItems: searchBarReducer,
  labels: labelReducer,
  signup: signupReducer,
  login: loginReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["labels", "player"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

const persistor = persistStore(store);

export { persistor, store };
