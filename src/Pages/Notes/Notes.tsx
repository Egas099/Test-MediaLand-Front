import { Col, Layout, Modal, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import NoteForm from '../../Components/NoteForm/NoteForm';
import NoteList from '../../Components/NoteList/NoteList';
import NoteView from '../../Components/NoteView/NoteView';
import useNoteService from '../../hooks/useNoteService';
import styles from './Notes.module.css';

type Props = {};

const emptyText =
    'Ой, а заметок ещё нет :) нажмите "добавить" в меню с лева, чтобы добавить новую заметку';

function Notes({}: Props) {
    const { list: noteList, updateNote, deleteNote } = useNoteService();
    const [viewNoteId, setViewNoteId] = useState(noteList[0]?.id);
    const viewNote =
        noteList.find(note => note.id === viewNoteId) || noteList[0];

    return (
        <Layout className={styles.layout}>
            <NavBar />
            <Content className={styles.content}>
                <Row justify="space-between" gutter={[30, 0]}>
                    <Col span={8}>
                        <NoteList
                            noteList={noteList}
                            onSelect={(noteId: number) => setViewNoteId(noteId)}
                        />
                    </Col>
                    <Col span={16}>
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
