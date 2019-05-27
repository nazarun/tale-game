import React from "react";
import './boardGame.scss';

const Tale = props => {
    const {item, cover, handleClick, processing} = props;

    return (
        <div className={`tale ${(item.opened || item.isSolved || processing) ? 'disabled' : ''}`}
             style={{background: (item.opened || item.isSolved) ? item.img : cover}}
             onClick={(e) => {handleClick(e, item)}}
        />
    )
};

export default Tale;
