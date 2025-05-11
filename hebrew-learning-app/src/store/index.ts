import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import podcastReducer from './slices/podcastSlice';
import vocabularyReducer from './slices/vocabularySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastReducer,
    vocabulary: vocabularyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
