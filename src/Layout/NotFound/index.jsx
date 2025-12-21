import React from 'react';

import { Center, Text } from '../../components';
import { error_404 } from '../../components/Images';

import style from "./style.module.css";

const NotFound = () => {
    return (
        <Center>
            <div className={style.notfoundContainer}>
                <div>
                    <div className={style.imageWrap}>
                        <div className={style.sizer} />
                        <img src={error_404} alt='404 error' />
                    </div>
                    <Text tag='h1' className="text-center" breeSerif>Page</Text>
                    <Text tag='p' className="text-center h2" breeSerif>Not Found</Text>
                </div>
            </div>
        </Center>
    )
}

export default NotFound;