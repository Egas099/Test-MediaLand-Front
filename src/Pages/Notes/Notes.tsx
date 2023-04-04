import AppHeader from 'Components/AppHeader/AppHeader';
import NoteList from 'Components/NoteList/NoteList';
import NoteView from 'Components/NoteView/NoteView';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { UpdateNote } from 'models/note';
import { useState } from 'react';
import useNoteService from 'shared/hooks/useNoteService';
import styles from './Notes.module.css';

const emptyText =
    'Ой, а заметок ещё нет :) нажмите "добавить" в меню с лева, чтобы добавить новую заметку';
enum MODE {
    VIEW,
    CREATE
}

function Notes() {
    const {
        list: noteList,
        updateNote,
        deleteNote,
        createNote
    } = useNoteService();
    const [viewNoteId, setViewNoteId] = useState(noteList[0]?.id);
    const [mode, setMode] = useState<MODE>(MODE.VIEW);

    const handleCreate = ({ body, color, title }: UpdateNote) => {
        setMode(MODE.VIEW);
        createNote({ body, color, title });
        setViewNoteId(noteList[0]?.id);
    };
    const handleSelect = (noteId: number) => {
        setMode(MODE.VIEW);
        setViewNoteId(noteId);
    };

    const viewNote: UpdateNote = {
        [MODE.CREATE]: { id: -1, title: '', body: '', color: '#ffffff' },
        [MODE.VIEW]:
            noteList.find(note => note.id === viewNoteId) || noteList[0]
    }[mode];
    const handleSave = {
        [MODE.CREATE]: handleCreate,
        [MODE.VIEW]: updateNote
    }[mode];
    const handleDelete = {
        [MODE.CREATE]: () => void 0,
        [MODE.VIEW]: deleteNote
    }[mode];

    return (
        <Layout className={styles.layout}>
            <AppHeader />
            <Content className={styles.content}>
                <Row
                    className={styles.fillContainer}
                    justify="space-between"
                    gutter={[30, 0]}
                >
                    <Col span={8} className={styles.fullHeight}>
                        <NoteList
                            noteList={noteList}
                            onSelect={handleSelect}
                            onCreate={() => setMode(MODE.CREATE)}
                        />
                    </Col>
                    <Col span={16} className={styles.fullHeight}>
                        {viewNote ? (
                            <NoteView
                                note={viewNote}
                                onSaveClick={handleSave}
                                onCancelClick={handleDelete}
                            />
                        ) : (
                            <span>{emptyText}</span>
                        )}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Notes;
