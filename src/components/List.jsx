import React from "react";
import Item from './Item';
import '../App.scss';

const List = props => {

    return (
        <ul>
            {props.todos.map((item, index) => (
                <Item key={index} item={item} handleClick={props.handleCheck}/>
            ))}
        </ul>
    )
};



export default List;
