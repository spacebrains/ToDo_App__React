import * as React from 'react';
import './Task.css'

export interface ITask {
    type: 'Task';
    task: string;
    id: number;
    finished?: boolean;
}

interface IProps {
    id: number;
    task: string;
    finished?: boolean;
    deleteTaskById: Function;
    finishById: Function;
}

export const Task: React.FC<IProps> = (data: IProps) => {
    const {id, task, finished, deleteTaskById, finishById} = data;
    const deleteTask = () => {
        deleteTaskById(id)
    };

    const finish = () => {
        finishById(id);
    };

    return (
        <>
            <span onClick={finish} className={finished ? 'finished' : 'notFinished'}>{task}</span>
            <button onClick={deleteTask}>X</button>
        </>
    );
};