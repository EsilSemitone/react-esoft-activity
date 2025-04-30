import { HTMLAttributes } from 'react';
import { TASK_STATUS } from '../Todo/enums/task-status';

export interface ITaskProps extends HTMLAttributes<HTMLElement> {
    id: string;
    title: string;
    status: TASK_STATUS;
    onDelete: (...args: any[]) => void;
    onToggle: (...args: any[]) => void;
}
