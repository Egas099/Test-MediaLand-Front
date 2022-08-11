import { Form, Input } from 'antd';
import { CreateNote } from '../../Models/Note';

type Props = {
    onSubmit: (note: CreateNote) => void;
};

const NoteForm = ({ onSubmit }: Props) => {
    return (
        <Form id="noteForm" onFinish={onSubmit} layout="vertical">
            <Form.Item
                label="Название заметки"
                name="title"
                rules={[
                    { required: true, message: 'Введите название заметки!' }
                ]}
            >
                <Input placeholder="Название заметки" value="" />
            </Form.Item>
            <Form.Item
                label="Текст заметки"
                name="body"
                rules={[{ required: true, message: 'Введите текст заметки!' }]}
            >
                <Input placeholder="Текст заметки" />
            </Form.Item>
            <Form.Item
                label="Цвет заметки"
                name="color"
                initialValue={'#6fb8d8'}
            >
                <Input type={'color'} />
            </Form.Item>
        </Form>
    );
};

export default NoteForm;
