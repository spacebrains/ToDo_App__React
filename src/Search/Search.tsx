import * as React from "react";
import './Search.css'

interface IProps {
    setSearchCondition: Function;
}

const Search: React.FC<IProps> = ({setSearchCondition}: IProps) => {
    let _condition: HTMLInputElement;

    const search = () => {
        setSearchCondition(_condition.value);
    };
    const deleteCondition = () => {
        _condition.value = '';
        setSearchCondition('');
    };

    return (
        <div className='Search'>
            <div className='Search__div'>
                <input
                    ref={(input: HTMLInputElement) => _condition = input}
                    type="text"
                    placeholder='...'
                    className='Search__input'
                />
                <span onClick={deleteCondition} className='Search__span'>X</span>
            </div>
            <button onClick={search} className='Search__button'>search</button>
        </div>
    );
};

export default Search;