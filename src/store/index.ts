import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import notes from './reducers/notes';

const store = configureStore({
    reducer: { auth: auth.reducer, notes: notes.reducer }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
