import { Note } from 'models/note';
import styles from './NoteListItem.module.css';

type Props = {
    note: Note;
    onClick: (id: number) => void;
};

const NoteListItem = ({
    note: { id, body, title, color: backgroundColor },
    onClick
}: Props) => {
    return (
        <div className={styles.listItem} onClick={() => onClick(id)}>
            <div className={styles.indicator} style={{ backgroundColor }} />
            <div className={styles.column}>
                <div className={styles.title}>{title}</div>
                <span className={styles.body}>{body}</span>
                <div className={styles.bodyMask} style={{ backgroundColor }} />
            </div>
        </div>
    );
};

export default NoteListItem;
