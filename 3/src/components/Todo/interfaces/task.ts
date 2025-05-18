import { TASK_STATUS } from '../enums/task-status';

export interface ITask {
    id: string;
    title: string;
    status: TASK_STATUS;
}
