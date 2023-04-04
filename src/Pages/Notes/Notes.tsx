import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';
import NoteList from '../../Components/NoteList/NoteList';
import NoteView from '../../Components/NoteView/NoteView';
import useNoteService from '../../shared/hooks/useNoteService';
import styles from './Notes.module.css';
import AppHeader from '../../Components/AppHeader/AppHeader';

const emptyText =
    'Ой, а заметок ещё нет :) нажмите "добавить" в меню с лева, чтобы добавить новую заметку';

function Notes() {
    const { list: noteList, updateNote, deleteNote } = useNoteService();
    const [viewNoteId, setViewNoteId] = useState(noteList[0]?.id);
    const viewNote =
        noteList.find(note => note.id === viewNoteId) || noteList[0];

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
                            onSelect={(noteId: number) => setViewNoteId(noteId)}
                        />
                    </Col>
                    <Col span={16} className={styles.fullHeight}>
                        {viewNote ? (
                            <NoteView
                                note={viewNote}
                                saveNote={updateNote}
                                deleteNote={deleteNote}
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
