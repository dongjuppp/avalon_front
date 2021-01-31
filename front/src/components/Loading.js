import React from 'react';

const Loading = () => {
    const style={
        color:'red',
        textAlign:'center',
        fontSize:'200%',
              
    }
    return (
        <div style={style}>
            <h1 style={{verticalAlign:'middle'}}>Loading...</h1>
        </div>
    );
};

export default Loading;