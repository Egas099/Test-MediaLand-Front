import { useEffect } from 'react';
import { CreateNote, UpdateNote } from 'models/note';
import { useTypedDispatch, useTypedSelector } from './useTypedRedux';
import { notesActionCreator } from 'store/reducers/notes/actionCreator';

function useNoteService() {
    const list = useTypedSelector(state => state.notes);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(notesActionCreator.readNotes());
    }, [dispatch]);

    return {
        ...list,
        createNote: (note: CreateNote) =>
            dispatch(notesActionCreator.createNote(note)),

        updateNote: (note: UpdateNote) =>
            dispatch(notesActionCreator.updateNote(note)),

        deleteNote: (noteId: number) =>
            dispatch(notesActionCreator.deleteNote(noteId))
    };
}

export default useNoteService;
