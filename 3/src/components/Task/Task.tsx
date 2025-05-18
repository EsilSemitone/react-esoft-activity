import TaskButton from '../TaskButton/TaskButton';
import { TASK_STATUS } from '../Todo/enums/task-status';
import { getStatusName, getTaskStatusToggleText } from '../Todo/helpers/task-status-toggle-text';
import styles from './Task.module.css';
import { ITaskProps } from './Task.props';
import { memo } from 'react';

const Task = memo(function ({ id, title, status, onDelete, onToggle }: ITaskProps) {
    return (
        <div className={styles['task']}>
            <div className={styles['task-info']}>
                <div>{title}</div>
                <div>{`Статус: ${getStatusName(status)}`}</div>
            </div>
            <div className={styles['task-footer']}>
                <TaskButton onClick={() => onToggle(id)} className={styles['task-button']}>
                    {getTaskStatusToggleText(status)}
                </TaskButton>
                <TaskButton onClick={() => onDelete(id)} className={styles['task-button']}>
                    Удалить
                </TaskButton>
            </div>
        </div>
    );
});

export default Task;
