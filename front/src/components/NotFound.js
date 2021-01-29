import React from 'react';

const NotFound = ({location}) => {
    return (
        <div style={{color:'red'}}>
            <h2>이페이지는 존재하지 않습니다</h2>
            <p>{location.pathname}</p>
        </div>
    );
};

export default NotFound;