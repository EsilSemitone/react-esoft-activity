import styles from './TaskButton.module.css';
import { ITaskButtonProps } from './TaskButton.props';

function TaskButton({ children, ...props }: ITaskButtonProps) {
    return (
        <button {...props} className={styles['task-button']}>
            {children}
        </button>
    );
}

export default TaskButton;
