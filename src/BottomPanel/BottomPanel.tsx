import * as React from 'react';

interface IProps {
    deleteFinished: Function;
    setBottomPanelType: Function
}

export const BottomPanel: React.FC<IProps> = ({deleteFinished, setBottomPanelType}: IProps) => {
    const onDeleteFinished = () => {
        deleteFinished();
    };

    const onSetBottomPanelType = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setBottomPanelType(target.value);
    };

    return (
        <>
            <div>
                <label>
                    <input
                        type='radio'
                        name='addForm'
                        value='Task'
                        onClick={onSetBottomPanelType}
                    />
                    Task
                </label>
                <label>
                    <input
                        type='radio'
                        name='addForm'
                        value='TaskWithSubTasks'
                        onClick={onSetBottomPanelType}
                    />
                    Task with subtasks
                </label>
                <label>
                    <input
                        type='radio'
                        name='addForm'
                        value='TaskWithTimer'
                        onClick={onSetBottomPanelType}
                    />
                    Task with timer
                </label>
            </div>
            <button onClick={onDeleteFinished}>Delete finished</button>
        </>
    );
};

export default BottomPanel;