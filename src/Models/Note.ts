export interface CreateNote {
    title: string;
    body: string;
    color: string;
}

export interface UpdateNote extends CreateNote {
    id: number;
}

export interface Note extends UpdateNote {
    date_create: number;
}
