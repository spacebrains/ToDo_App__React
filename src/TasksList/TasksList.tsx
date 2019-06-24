import * as React from "react";
import {ITask, Task} from "../Task/Task";
import {ITaskWithSubTasks, TaskWithSubTasks} from "../TaskWithSubTasks/TaskWithSubTasks";
import {ITaskWithTimer, TaskWithTimer} from "../TaskWithTimer/TaskWithTimer";

type TaskTypes = ITask | ITaskWithSubTasks | ITaskWithTimer;

interface IProps {
    tasks: Array<TaskTypes>;
    deleteTaskById: Function;
    finishById: Function;
    setDateForTaskWithSubTasks: Function;
}

const TasksList: React.FC<IProps> = (data: IProps) => {
    const {tasks, deleteTaskById, finishById, setDateForTaskWithSubTasks} = data;

    const drawTask = (t: TaskTypes) => {
        switch (t.type) {
            case 'Task':
                return (
                    <Task
                        id={t.id}
                        task={t.task}
                        finished={t.finished}
                        deleteTaskById={deleteTaskById}
                        finishById={finishById}
                    />
                );
            case 'TaskWithSubTasks':
                return (
                    <TaskWithSubTasks
                        id={t.id}
                        task={t.task}
                        finished={t.finished}
                        subTasks={t.subTasks}
                        deleteTaskById={deleteTaskById}
                        finishById={finishById}
                        setDateForTaskWithSubTasks={setDateForTaskWithSubTasks}
                    />
                );
            case 'TaskWithTimer':
                return (
                    <TaskWithTimer
                        id={t.id}
                        task={t.task}
                        finalTime={t.finalTime}
                        deleteTaskById={deleteTaskById}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <ul>
            {tasks.map(t =>
                <li key={t.id}>
                    {drawTask(t)}
                </li>
            )}
        </ul>
    );
};

export default TasksList;