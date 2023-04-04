import { Form, Input } from 'antd';
import { CreateNote } from '../../models/note';

type Props = {
    onSubmit: (note: CreateNote) => void;
};

const NoteForm = ({ onSubmit }: Props) => {
    const [form] = Form.useForm();

    const handleSubmit = (note: CreateNote) => {
        onSubmit(note);
        form.resetFields();
    };

    return (
        <Form
            id="noteForm"
            onFinish={handleSubmit}
            layout="vertical"
            form={form}
        >
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
