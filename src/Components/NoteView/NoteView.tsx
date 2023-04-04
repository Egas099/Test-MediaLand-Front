import { Button, Input, Popconfirm, Row, Space } from 'antd';
import { CreateNote, UpdateNote } from 'models/note';
import { useEffect, useState } from 'react';
import styles from './NoteView.module.css';
const { TextArea } = Input;

type Props = {
    note: { id?: number } & CreateNote;
    onCancelClick: (id: number) => void;
    onSaveClick: (note: UpdateNote) => void;
};

export const NoteView = ({
    note: { id, title, body, color },
    onCancelClick,
    onSaveClick
}: Props) => {
    const [editableTitle, setEditableTitle] = useState('');
    const [editableBody, setEditableBody] = useState('');
    const [editableColor, setEditableColor] = useState('');

    const resetFields = () => {
        setEditableTitle(title || '');
        setEditableBody(body || '');
        setEditableColor(color || '#ffffff');
    };
    useEffect(resetFields, [title, body, color]);

    const handleDelete = () => onCancelClick(id || -1);
    const handleSave = () => {
        onSaveClick({
            id: id || -1,
            title: editableTitle,
            body: editableBody,
            color: editableColor
        });
    };

    const isValidFields = Boolean(editableTitle && editableBody);
    const existUnsavedChanges =
        title !== editableTitle ||
        body !== editableBody ||
        color !== editableColor;
    
    const canSave = existUnsavedChanges && isValidFields;
    const canCancel = existUnsavedChanges || isValidFields;

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
                            existUnsavedChanges ? resetFields : handleDelete
                        }
                        okText="Yes"
                        cancelText="No"
                        disabled={!canCancel}
                    >
                        <Button
                            type="primary"
                            danger
                            className={styles.button}
                            disabled={!canCancel}
                        >
                            {existUnsavedChanges ? 'Отмена' : 'Удалить'}
                        </Button>
                    </Popconfirm>
                    <Button
                        type="primary"
                        className={styles.button}
                        disabled={!canSave}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                </Space>
            </Row>
        </Space>
    );
};