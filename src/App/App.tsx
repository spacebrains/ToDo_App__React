import * as React from 'react';
import Header from '../Header/Header'
import Search from '../Search/Search'
import TasksList from '../TasksList/TasksList'
import BottomPanel from '../BottomPanel/BottomPanel'
import BottomForms from '../BottomForms/BottomForms'
import {ITask} from "../Task/Task";
import {ITaskWithSubTasks} from "../TaskWithSubTasks/TaskWithSubTasks";
import {ITaskWithTimer} from "../TaskWithTimer/TaskWithTimer";
import './App.css';

type TaskTypes = ITask | ITaskWithSubTasks | ITaskWithTimer;
type Tasks = Array<TaskTypes>

interface IState {
    tasks: Tasks;
    search_condition: string;
    bottom_panel_type: 'Task' | 'TaskWithTimer' | 'TaskWithSubTasks' | 'SubTask' | '';
    TaskWithSubTasks_Id: number;
}

class App extends React.PureComponent {
    public state: IState = {
        tasks: [],
        search_condition: '',
        bottom_panel_type: '',
        TaskWithSubTasks_Id: 0

    };

    componentWillMount(): void {
        this.load();
    }

    componentDidUpdate(): void {
        this.save();
    }

    deleteTaskById = (id: number) => {
        const filterTasks = (tasks: Tasks) => tasks.filter(t => t.id !== id);
        const newTasks =
            filterTasks(this.state.tasks)
                .map(t => t.type === 'TaskWithSubTasks' ? {...t, subTasks: filterTasks(t.subTasks)} : t);
        this.setState({...this.state, tasks: newTasks});
    };

    finishById = (id: number) => {
        const newTasks = this.state.tasks.map(t => {
            if (t.id === id)
                return {...t, finished: !t.finished};
            else if (t.type === 'TaskWithSubTasks') {
                const newSubTasks = t.subTasks.map(t => t.id === id ? {...t, finished: !t.finished} : t);
                const newFinished = newSubTasks.every(t => t.finished);
                return {...t, finished: newFinished, subTasks: newSubTasks};
            } else return t;
        });
        this.setState({...this.state, tasks: newTasks});
    };

    deleteFinished = () => {
        const filterTasks = (tasks: Tasks) => tasks.filter(t => !t.finished);
        const newTasks =
            filterTasks(this.state.tasks)
                .map(t => t.type === 'TaskWithSubTasks' ? {...t, subTasks: filterTasks(t.subTasks)} : t)
                .filter(t=>t.type!=='TaskWithTimer' || new Date() < new Date(t.finalTime));
        this.setState({...this.state, tasks: newTasks});
    };

    setSearchCondition = (condition: string) => {
        this.setState({...this.state, search_condition: condition})
    };

    search = (subString: string = this.state.search_condition) => {
        const compare = (task: string) => task.toLowerCase().indexOf(subString.toLowerCase()) + 1;
        let result: Tasks = [];
        this.state.tasks.forEach((t) => {
            if (compare(t.task))
                result.push(t);
            if (t.type === 'TaskWithSubTasks')
                result = [...result, ...t.subTasks.filter((t) => compare(t.task))];

        });
        return result;
    };

    setBottomPanelType = (type: string) => {
        this.setState({...this.state, bottom_panel_type: type});
    };

    setDateForTaskWithSubTasks = (id: number) => {
        this.setState({...this.state, TaskWithSubTasks_Id: id, bottom_panel_type: 'SubTask'});
    };


    addTask = (task: string) => {
        const newTask = {
            type: 'Task',
            task: task,
            finished: false,
            id: Math.random()
        };
        this.setState({...this.state, tasks: [...this.state.tasks, newTask]})
    };

    addTaskWithSubTasks = (task: string) => {
        const newTask = {
            type: 'TaskWithSubTasks',
            task: task,
            finished: false,
            id: Math.random(),
            subTasks: []
        };
        this.setState({...this.state, tasks: [...this.state.tasks, newTask]})
    };

    addSubTasks = (task: string, id: number = this.state.TaskWithSubTasks_Id) => {
        const newSubTask = {
            type: 'Task',
            task: task,
            finished: false,
            id: Math.random(),
        } as ITask;

        const newTaskState = this.state.tasks.map(t => {
            if (t.id === id && t.type === 'TaskWithSubTasks') {
                return {...t, subTasks: [...t.subTasks, newSubTask]}
            } else return t;
        });

        this.setState({...this.state, tasks: newTaskState})
    };

    addTaskWithTimer = (task: string, finalTime: Date) => {
        const newTask = {
            type: 'TaskWithTimer',
            task: task,
            id: Math.random(),
            finalTime: new Date(finalTime)
        };
        this.setState({...this.state, tasks: [...this.state.tasks, newTask]})
    };

    load() {
        if (!localStorage['data']) return;
        this.setState({...this.state, tasks: JSON.parse(localStorage['data']).tasks});
    }

    save() {
        localStorage['data'] = '';
        localStorage['data'] = JSON.stringify({tasks: this.state.tasks});
    }

    render(): React.ReactNode {
        return (
            <>
                <Header/>
                <div className='App'>
                    <div className='App__container'>
                        <Search setSearchCondition={this.setSearchCondition}/>
                        <TasksList
                            tasks={this.state.search_condition ? this.search() : this.state.tasks}
                            finishById={this.finishById}
                            deleteTaskById={this.deleteTaskById}
                            setDateForTaskWithSubTasks={this.setDateForTaskWithSubTasks}
                        />
                        <BottomPanel
                            deleteFinished={this.deleteFinished}
                            setBottomPanelType={this.setBottomPanelType}
                        />
                        <BottomForms
                            bottom_panel_type={this.state.bottom_panel_type}
                            setBottomPanelType={this.setBottomPanelType}
                            addTask={this.addTask}
                            addTaskWithSubTasks={this.addTaskWithSubTasks}
                            addTaskWithTimer={this.addTaskWithTimer}
                            addSubTask={this.addSubTasks}
                        />
                    </div>
                </div>
            </>
        );
    }

}

export default App;
