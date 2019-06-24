import * as React from 'react';
import {Task, ITask} from "../Task/Task";
import './TaskWithSubTasks.css'

export interface ITaskWithSubTasks {
    type: 'TaskWithSubTasks';
    task: string;
    id: number;
    finished?: boolean;
    subTasks: Array<ITask>
}

interface IProps {
    id: number;
    task: string;
    finished?: boolean;
    deleteTaskById: Function;
    finishById: Function;
    subTasks: Array<ITask>;
    setDateForTaskWithSubTasks: Function
}

export const TaskWithSubTasks: React.FC<IProps> = (data: IProps) => {
    const {id, task, finished, subTasks, deleteTaskById, finishById, setDateForTaskWithSubTasks} = data;

    const onSubmitPlus = () => {
        setDateForTaskWithSubTasks(id);
    };
    return (
        <div className={finished ? 'TaskWithSubTasks TaskWithSubTasks-finished'
            : 'TaskWithSubTasks TaskWithSubTasks-notFinished'}
        >
            {console.log(subTasks)}
            <Task
                id={id}
                task={task}
                finished={finished}
                deleteTaskById={deleteTaskById}
                finishById={(f:any)=>f}
            />
            <ul className='TaskWithSubTasks__ul'>
                {subTasks.map(subT =>
                    <li key={subT.id}>
                        <Task
                            id={subT.id}
                            task={subT.task}
                            finished={subT.finished}
                            deleteTaskById={deleteTaskById}
                            finishById={finishById}/>
                    </li>
                )}
                <button
                    onClick={onSubmitPlus}
                    className={finished ? 'TaskWithSubTasks__button TaskWithSubTasks-finishedForB'
                        : 'TaskWithSubTasks__button TaskWithSubTasks-notFinishedForB'}
                >+</button>
            </ul>
        </div>
    );
};