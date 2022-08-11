import axios from 'axios';
import { CreateNote, Note, UpdateNote } from '../Models/Note';
import { getRandomNumber } from '../utils/helpers';

// const NOTE_ROUTE = '/note';

const noteService = {
    createNote: async (createdNote: CreateNote): Promise<Note> => {
        // const response = await axios.post<Note>(NOTE_ROUTE, createdNote, {
        //     headers: {
        //         token: getToken()
        //     }
        // });
        // return response.data;
        return {
            ...createdNote,
            date_create: Date.now(),
            id: getRandomNumber()
        };
    },
    getNotes: async (): Promise<Note[]> => {
        // const response = await axios.get<GetNoteResponse>(NOTE_ROUTE, {
        //     headers: {
        //         token: getToken()
        //     }
        // });
        // if(response.data.status === "ok") {
        //     return response.data;
        // } else {
        //     return;
        // }
        return await (
            await axios.get<Note[]>('./note.json')
        ).data;
    },
    updateNote: async (updatedNote: UpdateNote): Promise<Note> => {
        // const response = await axios.put<Note>(
        //     `${NOTE_ROUTE}/${updatedNote.id}`,
        //     updatedNote,
        //     {
        //         headers: {
        //             token: getToken()
        //         }
        //     }
        // );
        // return response.data;
        return {
            ...updatedNote,
            date_create: Date.now()
        };
    },
    deleteNote: async (noteId: number): Promise<boolean> => {
        // const response = await axios.delete(`${NOTE_ROUTE}/${noteId}`, {
        //     headers: {
        //         token: getToken()
        //     }
        // });
        // if (response.status === 204) {
        // return true;
        // } else {
        //     return false;
        // }
        return true;
    }
};

export default noteService;

export interface GetNoteResponse {
    status: string;
    notes: Note[];
}

// function getToken() {
//     const token = localStorage.getItem('token');
//     return typeof token === 'string' ? token : '';
// }
