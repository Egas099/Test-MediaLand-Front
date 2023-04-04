import { Button, Modal, Row, Typography } from 'antd';
import { CreateNote, Note } from '../../models/note';
import NoteListItem from './NoteListItem/NoteListItem';
import styles from './NoteList.module.css';
import NoteForm from '../NoteForm/NoteForm';
import { useState } from 'react';
import useNoteService from '../../shared/hooks/useNoteService';

type Props = {
    noteList: Note[];
    onSelect: (noteId: number) => void;
};

const NoteList = ({ noteList, onSelect }: Props) => {
    const { createNote } = useNoteService();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const onSubmitNoteForm = (values: CreateNote) => {
        createNote(values);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={styles.wrapper}>
            <Modal
                title="Создание новой заметки"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        form="noteForm"
                        key="submit"
                        htmlType="submit"
                        type="primary"
                    >
                        Создать
                    </Button>
                ]}
            >
                <NoteForm onSubmit={onSubmitNoteForm} />
            </Modal>
            <Row justify="space-between" className={styles.header}>
                <Typography.Text>Список заметок</Typography.Text>
                <Typography.Link onClick={showModal}>Добавить</Typography.Link>
            </Row>
            <div className={styles.list}>
                {noteList.map(item => (
                    <NoteListItem
                        key={item.id}
                        note={item}
                        onClick={onSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default NoteList;
