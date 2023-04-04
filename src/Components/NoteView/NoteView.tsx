import { Button, Input, Popconfirm, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Note, UpdateNote } from '../../models/note';
import styles from './NoteView.module.css';
const { TextArea } = Input;

type Props = {
    note: Note;
    deleteNote: (id: number) => void;
    saveNote: (note: UpdateNote) => void;
};

const NoteView = ({
    note: { id, title, body, color },
    deleteNote,
    saveNote
}: Props) => {
    const [editableTitle, setEditableTitle] = useState('');
    const [editableBody, setEditableBody] = useState('');
    const [editableColor, setEditableColor] = useState('');

    const resetFields = () => {
        setEditableTitle(title);
        setEditableBody(body);
        setEditableColor(color);
    };
    useEffect(resetFields, [title, body, color]);

    const confirmDelete = () => deleteNote(id);
    const handleSave = () => {
        saveNote({
            id,
            title: editableTitle,
            body: editableBody,
            color: editableColor
        });
    };

    const existUnsavedChanges =
        title !== editableTitle ||
        body !== editableBody ||
        color !== editableColor;

    return (
        <Space className={styles.wrapper} direction="vertical">
            <Input
                className={styles.titleInput}
                value={editableTitle}
                placeholder="Введите имя заметки"
                onChange={e => setEditableTitle(e.target.value)}
                bordered={false}
            />
            <TextArea
                className={styles.bodyInput}
                value={editableBody}
                placeholder="Текст заметки"
                onChange={e => setEditableBody(e.target.value)}
            />
            <Row justify="space-between">
                <Space size="middle">
                    <div className={styles.colorSpan}>
                        Выберите цвет заметки
                    </div>
                    <input
                        value={editableColor}
                        onChange={e => setEditableColor(e.target.value)}
                        type="color"
                    />
                </Space>
                <Space size="middle">
                    <Popconfirm
                        title={
                            existUnsavedChanges
                                ? 'Вы действительно хотите отменить изменения?'
                                : 'Вы действительно хотите удалить эту заметку?'
                        }
                        onConfirm={
                            existUnsavedChanges ? resetFields : confirmDelete
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger className={styles.button}>
                            {existUnsavedChanges ? 'Отмена' : 'Удалить'}
                        </Button>
                    </Popconfirm>
                    <Button
                        type="primary"
                        className={styles.button}
                        disabled={!existUnsavedChanges}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                </Space>
            </Row>
        </Space>
    );
};

export default NoteView;
