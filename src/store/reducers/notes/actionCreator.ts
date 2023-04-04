import { CreateNote, Note, UpdateNote } from 'models/note';
import noteService from 'shared/api/noteService';
import { AppDispatch } from 'store';
import notes from '.';
import { tryAsync } from 'shared/utils';
const { setNotes, addNote, editNote, removeNote, setIsLoading, setError } =
    notes.actions;

function handleError(error: unknown, dispatch: AppDispatch) {
    console.error(error);
    dispatch(setError(String(error)));
}

export const notesActionCreator = {
    createNote: (createdNote: CreateNote) => async (dispatch: AppDispatch) => {
        await tryAsync<Note>(
            () => noteService.createNote(createdNote),
            result => dispatch(addNote(result)),
            error => handleError(error, dispatch)
        );
    },
    readNotes: () => async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        await tryAsync<Note[]>(
            () => noteService.getNotes(),
            result => dispatch(setNotes(result)),
            error => handleError(error, dispatch)
        );
        dispatch(setIsLoading(false));
    },
    updateNote: (updatedNote: UpdateNote) => async (dispatch: AppDispatch) => {
        await tryAsync<Note>(
            () => noteService.updateNote(updatedNote),
            result => dispatch(editNote(result)),
            error => handleError(error, dispatch)
        );
    },
    deleteNote: (noteId: number) => async (dispatch: AppDispatch) => {
        await tryAsync<Boolean>(
            () => noteService.deleteNote(noteId),
            result =>
                result
                    ? dispatch(removeNote(noteId))
                    : handleError('Не удалось удалить заметку', dispatch),
            error => handleError(error, dispatch)
        );
    }
};
