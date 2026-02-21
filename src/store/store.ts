import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { createMMKV } from "react-native-mmkv";
import type { Storage } from "redux-persist";
import { authSlice, chatSlice } from "@/features";
import rootSaga from "./rootSaga";

const storage = createMMKV({
  id: "root-storage",
});

const reduxStorage: Storage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    const bool = storage.remove(key);
    return Promise.resolve(bool);
  },
};

const rootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
});

const persistConfig = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["auth", "chat"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
