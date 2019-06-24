import * as React from "react";

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
        <div>
            <input ref={(input: HTMLInputElement) => _condition = input} type="text"/>
            <span onClick={deleteCondition}>X</span>
            <button onClick={search}>--></button>
        </div>
    );
};

export default Search;