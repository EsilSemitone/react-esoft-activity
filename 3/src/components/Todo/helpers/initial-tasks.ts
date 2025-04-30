import { TASK_STATUS } from '../enums/task-status';
import { ITask } from '../interfaces/task';

export const INITIAL_TASKS: ITask[] = [
    { id: Math.random().toString(), title: 'Задача 1', status: TASK_STATUS.ACTIVE },
    { id: Math.random().toString(), title: 'Задача 1', status: TASK_STATUS.EXPIRED },
    { id: Math.random().toString(), title: 'Задача 1', status: TASK_STATUS.COMPLETED },
    { id: Math.random().toString(), title: 'Задача 1', status: TASK_STATUS.EXPIRED },
];
