import { Row, Typography } from 'antd';
import { Note } from 'models/note';
import NoteListItem from './NoteListItem/NoteListItem';
import styles from './NoteList.module.css';

type Props = {
    noteList: Note[];
    onSelect: (noteId: number) => void;
    onCreate: () => void;
};

const NoteList = ({ noteList, onSelect, onCreate }: Props) => {
    return (
        <div className={styles.wrapper}>
            <Row justify="space-between" className={styles.header}>
                <Typography.Text>Список заметок</Typography.Text>
                <Typography.Link onClick={onCreate}>Добавить</Typography.Link>
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
