import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../../Models/Note';

export type NotesState = {
    list: Note[];
    isLoading: boolean;
    error: string;
};

const initialState: NotesState = {
    list: [],
    isLoading: false,
    error: ''
};

const notes = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, { payload }: PayloadAction<Note[]>) => {
            state.list = sortByDataCreate(payload);
        },
        addNote: (state, { payload }: PayloadAction<Note>) => {
            state.list = sortByDataCreate([...state.list, payload]);
        },
        editNote: (state, { payload }: PayloadAction<Note>) => {
            state.list = state.list.map(note =>
                note.id === payload.id ? payload : note
            );
        },
        removeNote: (state, { payload }: PayloadAction<number>) => {
            state.list = state.list.filter(({ id }) => id !== payload);
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
    }
});

export default notes;

function sortByDataCreate(notes: Note[]) {
    return notes.sort((a, b) => a.date_create - b.date_create);
}
