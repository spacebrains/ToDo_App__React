import * as React from 'react';
import './BottomPanel.css'

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
        <div className='BottomPanel'>
            <div>
                <label className='BottomPanel__label'>
                    <input
                        type='radio'
                        name='addForm'
                        value='Task'
                        onClick={onSetBottomPanelType}
                        className='BottomPanel__radio'
                    />
                    <span>Task</span>
                </label>
                <label  className='BottomPanel__label'>
                    <input
                        type='radio'
                        name='addForm'
                        value='TaskWithSubTasks'
                        onClick={onSetBottomPanelType}
                        className='BottomPanel__radio'
                    />
                    <span>Task with subtasks</span>
                </label>
                <label  className='BottomPanel__label'>
                    <input
                        type='radio'
                        name='addForm'
                        value='TaskWithTimer'
                        onClick={onSetBottomPanelType}
                        className='BottomPanel__radio'
                    />
                    <span>Task with timer</span>
                </label>
            </div>
            <button onClick={onDeleteFinished} className='BottomPanel__button'>Delete finished</button>
        </div>
    );
};

export default BottomPanel;