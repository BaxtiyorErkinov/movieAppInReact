import React from 'react';

const Loader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: 'rem'}}>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
}

export default Loader;
