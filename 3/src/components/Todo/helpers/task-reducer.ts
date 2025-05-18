import { TASK_REDUCER_TYPE } from '../enums/task-reducer-type';
import { TASK_STATUS } from '../enums/task-status';
import { ITaskReducerAction, ITaskReducerState } from '../interfaces/task-reduce-state';

export function taskReducer(state: ITaskReducerState, { type, payload }: ITaskReducerAction) {
    switch (type) {
        case TASK_REDUCER_TYPE.ADD_TODO: {
            return {
                tasks: [...state.tasks, { id: Math.random.toString(), title: payload, status: TASK_STATUS.ACTIVE }],
            };
        }
        case TASK_REDUCER_TYPE.DELETE_TODO: {
            const currentTasks = state.tasks.filter((t) => t.id !== payload);
            return {
                tasks: [...currentTasks],
            };
        }
        case TASK_REDUCER_TYPE.TOGGLE_TODO: {
            const currentTasks = state.tasks.map((t) => {
                if (t.id === payload) {
                    switch (t.status) {
                        case TASK_STATUS.ACTIVE:
                            return { ...t, status: TASK_STATUS.COMPLETED };
                        case TASK_STATUS.COMPLETED:
                            return { ...t, status: TASK_STATUS.EXPIRED };
                        case TASK_STATUS.EXPIRED:
                            return { ...t, status: TASK_STATUS.ACTIVE };
                    }
                }
                return t;
            });

            return {
                tasks: [...currentTasks],
            };
        }
        default:
            return state;
    }
}
