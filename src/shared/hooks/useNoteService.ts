import { useEffect } from 'react';
import { CreateNote, UpdateNote } from 'models/note';
import { useTypedDispatch, useTypedSelector } from './useTypedRedux';
import { notesActionCreator } from 'store/reducers/notes/actionCreator';

function useNoteService() {
    const list = useTypedSelector(state => state.notes.list);
    const dispatch = useTypedDispatch();

    function createNote(note: CreateNote) {
        dispatch(notesActionCreator.createNote(note));
    }
    function updateNote(note: UpdateNote) {
        dispatch(notesActionCreator.updateNote(note));
    }
    function deleteNote(noteId: number) {
        dispatch(notesActionCreator.deleteNote(noteId));
    }

    useEffect(() => {
        dispatch(notesActionCreator.readNotes());
    }, [dispatch]);

    return {
        list,
        createNote,
        updateNote,
        deleteNote
    };
}

export default useNoteService;
