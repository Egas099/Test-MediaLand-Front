import notes from '.';
import { AppDispatch } from '../..';
import noteService from '../../../api/noteService';
import { CreateNote, UpdateNote } from '../../../Models/Note';
const { setNotes, addNote, editNote, removeNote, setIsLoading } = notes.actions;

export const notesActionCreator = {
    createNote: (createdNote: CreateNote) => async (dispatch: AppDispatch) => {
        try {
            const newNote = await noteService.createNote(createdNote);
            dispatch(addNote(newNote));
        } catch (error) {
            console.error(error);
        }
    },
    readNotes: () => async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        try {
            const notes = await noteService.getNotes();
            dispatch(setNotes(notes));
        } catch (error) {
            console.error(error);
        }
        dispatch(setIsLoading(false));
    },
    updateNote: (updatedNote: UpdateNote) => async (dispatch: AppDispatch) => {
        try {
            const newNote = await noteService.updateNote(updatedNote);
            dispatch(editNote(newNote));
        } catch (error) {
            console.error(error);
        }
    },
    deleteNote: (noteId: number) => async (dispatch: AppDispatch) => {
        try {
            const response = await noteService.deleteNote(noteId);
            if (response) {
                dispatch(removeNote(noteId));
            }
        } catch (error) {
            console.error(error);
        }
    }
};
