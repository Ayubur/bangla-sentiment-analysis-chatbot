import React from 'react';

import './avatar.css';

const avatar = (props)=>(
    <div className="avatar">
        <div className="avatar-img">
            <img src={props.image } alt="#" />
        </div>
        <span className={`isOnline ${props.isOnline}`}></span>
    </div>
);

export default avatar;