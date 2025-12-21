import React from 'react';

import { RotatingLines } from 'react-loader-spinner';

const Spinner = ({ className, color = '#000', size = 24 }) => {
    return (
        <>
            <RotatingLines
                width={size}
                height={size}
                color={color}
                ariaLabel='Spinner'
                wrapperClass={className}
            />
        </>
    )
}

export default Spinner