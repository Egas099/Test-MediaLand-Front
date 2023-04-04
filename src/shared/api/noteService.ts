import { CreateNote, Note, UpdateNote } from '../../models/note';
import { SERVER_URL, SUCCESS_STATUS } from '../constants';

const NOTE_ROUTE = '/note';
type Response<T> = {
    status: string;
    notes: T;
};
const getToken = () => localStorage.getItem('token') || '';
const prepareHeaders = () => ({ headers: { token: getToken() } });

const noteService = {
    createNote: async (createdNote: CreateNote): Promise<Note> => {
        const config: RequestInit = {
            method: 'POST',
            body: JSON.stringify(createdNote),
            ...prepareHeaders()
        };

        const response = (await fetch(SERVER_URL + NOTE_ROUTE, config).then(
            response => response.json()
        )) as Response<Note>;

        if (response.status === SUCCESS_STATUS) {
            return response.notes;
        } else {
            throw new Error('Failed to create note');
        }
    },
    getNotes: async (): Promise<Note[]> => {
        const config: RequestInit = {
            ...prepareHeaders()
        };

        const response = (await fetch(SERVER_URL + NOTE_ROUTE, config).then(
            response => response.json()
        )) as Response<Note[]>;

        if (response.status === SUCCESS_STATUS) {
            return response.notes;
        } else {
            throw new Error('Failed to fetch notes');
        }
    },
    updateNote: async (updatedNote: UpdateNote): Promise<Note> => {
        const config: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(updatedNote),
            ...prepareHeaders()
        };

        const response = (await fetch(SERVER_URL + NOTE_ROUTE, config).then(
            response => response.json()
        )) as Response<Note>;

        if (response.status === SUCCESS_STATUS) {
            return response.notes;
        } else {
            throw new Error('Failed to update note');
        }
    },
    deleteNote: async (noteId: number): Promise<boolean> => {
        const config: RequestInit = {
            method: 'DELETE',
            body: JSON.stringify({ id: noteId }),
            ...prepareHeaders()
        };

        const response = await fetch(SERVER_URL + NOTE_ROUTE, config);

        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to delete note');
        }
    }
};

export default noteService;
