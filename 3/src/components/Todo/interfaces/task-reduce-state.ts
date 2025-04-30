import { TASK_REDUCER_TYPE } from '../enums/task-reducer-type';
import { ITask } from './task';

export interface ITaskReducerAction {
    type: TASK_REDUCER_TYPE;
    payload?: any;
}

export interface ITaskReducerState {
    tasks: ITask[];
}
