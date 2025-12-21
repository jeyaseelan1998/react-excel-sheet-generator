import React from 'react';

import style from './style.module.css';

const Text = ({ children, tag = 'p', className, breeSerif = false }) => {

    const Tag = tag;

    return (
        <Tag className={`${style.text}${className ? ` ${className}` : ''}${breeSerif ? ` ${style.breeSherif}` : ''}`}>
            {children}
        </Tag>
    )
}

export default Text;