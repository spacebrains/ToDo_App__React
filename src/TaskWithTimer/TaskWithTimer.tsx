import * as React from 'react';
import {Task} from "../Task/Task";

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
        <>
            <Task
                id={id}
                task={task}
                finished={Date.now() > +finalTime}
                deleteTaskById={deleteTaskById}
                finishById={(f: any) => f}
            />
            <span>{Math.round((+new Date(finalTime) - Date.now()) / 3600000)} hours</span>
        </>
    );
};