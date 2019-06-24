import * as React from 'react';

interface IProps {
    bottom_panel_type: 'Task' | 'TaskWithTimer' | 'TaskWithSubTasks' | 'SubTask' | '';
    setBottomPanelType: Function
    addTask: Function;
    addTaskWithSubTasks: Function;
    addTaskWithTimer: Function;
    addSubTask: Function;
}

export const BottomForms: React.FC<IProps> = (data: IProps) => {
    const {
        bottom_panel_type,
        setBottomPanelType,
        addTask,
        addTaskWithSubTasks,
        addTaskWithTimer,
        addSubTask
    } = data;

    let _task: HTMLInputElement;
    let _datetime: HTMLInputElement;

    const onSetBottomPanelType = () => setBottomPanelType('');

    const onAddTask = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addTask(_task.value);
        _task.value = '';
    };
    const onAddTaskWithSubTasks = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addTaskWithSubTasks(_task.value);
        _task.value = '';
    };
    const onAddTaskWithTimer = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addTaskWithTimer(_task.value, _datetime.value);
        _task.value = '';
        _datetime.value = '';
    };

    const onAddSubTask = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addSubTask(_task.value);
        _task.value = '';
    };

    const drawForm = () => {
        switch (bottom_panel_type) {
            case 'Task':
                return (
                    <form onSubmit={onAddTask}>
                        <span>add Task</span>
                        <input
                            ref={(input: HTMLInputElement) => _task = input}
                            type="text"
                            required
                        />
                        <button>ADD</button>
                    </form>
                );
            case 'TaskWithSubTasks':
                return (
                    <form onSubmit={onAddTaskWithSubTasks}>
                        <span>add task with subtasks</span>
                        <input
                            ref={(input: HTMLInputElement) => _task = input}
                            type="text"
                            required
                        />
                        <button>ADD</button>
                    </form>
                );
            case 'TaskWithTimer':
                return (
                    <form onSubmit={onAddTaskWithTimer}>
                        <span>add task with timer</span>
                        <input
                            ref={(input: HTMLInputElement) => _task = input}
                            type="text"
                            required/>
                        <input
                            ref={(input: HTMLInputElement) => _datetime = input}
                            type="datetime-local"
                            required
                        />
                        <button>ADD</button>
                    </form>
                );
            case 'SubTask':
                return (
                    <form onSubmit={onAddSubTask}>
                        <span>add subtask</span>
                        <input
                            ref={(input: HTMLInputElement) => _task = input}
                            type="text"
                            required
                        />
                        <button>ADD</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className='BottomForms'>
            {bottom_panel_type ?
                <>
                    {drawForm()}
                    <button onClick={onSetBottomPanelType}>X</button>
                </>
                : null}
        </div>
    );
};

export default BottomForms;