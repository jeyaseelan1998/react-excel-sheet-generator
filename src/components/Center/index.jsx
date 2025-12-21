import React from 'react';

const Center = ({ children, fluid = false, size }) => {
    return (
        <div className={fluid ? 'container-fluid' : `container${size ? `-${size}` : ''}`}>
            {children}
        </div>
    )
}

export default Center;