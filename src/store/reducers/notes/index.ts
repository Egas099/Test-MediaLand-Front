import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from 'models/note';
import { cacheManager, sortByDataCreate } from './utils';

const cache = cacheManager<Note[]>('notes');

export type NotesState = {
    list: Note[];
    isLoading: boolean;
    error: string;
};

const initialState: NotesState = {
    list: cache.getCache(),
    isLoading: false,
    error: ''
};

const notes = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, { payload }: PayloadAction<Note[]>) => {
            state.list = sortByDataCreate(payload);
            cache.setCache(state.list);
        },
        addNote: (state, { payload }: PayloadAction<Note>) => {
            state.list.unshift(payload);
            cache.setCache(state.list);
        },
        editNote: (state, { payload }: PayloadAction<Note>) => {
            state.list = state.list.map(note =>
                note.id === payload.id ? payload : note
            );
            cache.setCache(state.list);
        },
        removeNote: (state, { payload }: PayloadAction<number>) => {
            state.list = state.list.filter(({ id }) => id !== payload);
            cache.setCache(state.list);
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        }
    }
});

export default notes;
