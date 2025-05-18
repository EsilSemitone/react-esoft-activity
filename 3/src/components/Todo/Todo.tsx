import { useCallback, useReducer, useState } from 'react';
import styles from './Todo.module.css';
import { INITIAL_TASKS } from './helpers/initial-tasks';
import { taskReducer } from './helpers/task-reducer';
import Task from '../Task/Task';
import { TASK_REDUCER_TYPE } from './enums/task-reducer-type';
import Input from '../Input/Input';
import TaskButton from '../TaskButton/TaskButton';

function Todo() {
    const [state, dispatch] = useReducer(taskReducer, { tasks: INITIAL_TASKS });
    const [newTaskName, setNewTaskName] = useState('');

    const onDelete = useCallback((id: string) => {
        dispatch({ type: TASK_REDUCER_TYPE.DELETE_TODO, payload: id });
    }, []);

    const onToggle = useCallback((id: string) => {
        dispatch({ type: TASK_REDUCER_TYPE.TOGGLE_TODO, payload: id });
    }, []);

    const onCreate = useCallback((title: string) => {
        if (title !== '') {
            dispatch({ type: TASK_REDUCER_TYPE.ADD_TODO, payload: title });
            setNewTaskName('');
        }
    }, []);

    return (
        <div className={styles['todo']}>
            <div className={styles['todo-control']}>
                <div className={styles['create-task-block']}>
                    <Input
                        placeholder={'Название задачи'}
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        type="text"
                        name="task"
                    ></Input>
                    <TaskButton onClick={() => onCreate(newTaskName)}>Создать</TaskButton>
                </div>
            </div>
            <div className={styles['tasks']}>
                <h2>Задачи</h2>
                <div className={styles['task-container']}>
                    {state.tasks.length === 0 && 'Пока нет задач'}
                    {state.tasks.length > 0 &&
                        state.tasks.map(({ status, title, id }) => {
                            return (
                                <Task
                                    id={id}
                                    key={id}
                                    title={title}
                                    status={status}
                                    onDelete={onDelete}
                                    onToggle={onToggle}
                                ></Task>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Todo;
