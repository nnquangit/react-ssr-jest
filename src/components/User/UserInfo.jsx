import React from 'react';

export const UserInfo = ({picture, email, registered}) => {
    return (<div className="media">
        <div className="d-flex mr-3 align-self-top">
            <img src={picture.thumbnail}/>
        </div>
        <div className="media-body">
            <h6 className="mt-0">{email}</h6> <p>Registered {JSON.stringify(registered)}</p>
        </div>
    </div>)
}