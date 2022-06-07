import React, { FC } from 'react';
import './loading.scss';

interface IProp {
    open: boolean
}

const Loading: FC<IProp> = (props: IProp) => {
    const { open } = props;
    return (
        <div hidden={!open}>
            <div className="fixed-loading"></div>
            <div className="loader"></div>
        </div>
    )
}

export default Loading;