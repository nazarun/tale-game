import React from "react";
import '../App.scss';

const Item = props => {
    const {index, item, handleClick} = props;
    const { id } = props.item;
    const btnClass = props.item.done ? 'item_done' : 'item_not_done';

    return (
        <div className="item_wrap">
            <button
                className={`check_btn ${btnClass}`}
                onClick={(e) => {handleClick(e, id)}}
            />
            <li className="item_text"
                key={index}
            >
                {item.text}
            </li>
        </div>
    )
};

export default Item;