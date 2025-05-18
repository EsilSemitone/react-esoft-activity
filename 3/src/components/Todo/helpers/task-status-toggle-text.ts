import { TASK_STATUS } from '../enums/task-status';

export function getTaskStatusToggleText(status: TASK_STATUS) {
    switch (status) {
        case TASK_STATUS.EXPIRED:
            return 'В активно';
        case TASK_STATUS.ACTIVE:
            return 'Выполено';
        case TASK_STATUS.COMPLETED:
            return 'В Просрочено';
    }
}

export function getStatusName(status: TASK_STATUS) {
    switch (status) {
        case TASK_STATUS.EXPIRED:
            return 'Просрочено';
        case TASK_STATUS.ACTIVE:
            return 'Активно';
        case TASK_STATUS.COMPLETED:
            return 'Выполнено';
    }
}
