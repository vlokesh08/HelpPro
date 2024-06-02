// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './Slice/userSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
