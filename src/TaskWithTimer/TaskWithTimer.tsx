import * as React from 'react';
import {Task} from "../Task/Task";
import './TaskWithTimer.css'

export interface ITaskWithTimer {
    type: 'TaskWithTimer';
    task: string;
    id: number;
    finished?: boolean;
    finalTime: Date;
}


interface IProps {
    id: number;
    task: string;
    deleteTaskById: Function;
    finalTime: Date;
}

export const TaskWithTimer: React.FC<IProps> = ({id, task, finalTime, deleteTaskById}: IProps) => {
    return (
        <div className={+new Date() > +new Date(finalTime) ? 'TaskWithTimer Timer-finished' : 'TaskWithTimer Timer-notFinished'}>
            <Task
                id={id}
                task={task}
                finished={new Date() > new Date(finalTime)}
                deleteTaskById={deleteTaskById}
                finishById={(f: any) => f}
            />
            <span >{Math.round((+new Date(finalTime) - Date.now()) / 3600000)} hours</span>
        </div>
    );
};