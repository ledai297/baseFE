import React, { Fragment, ComponentType } from 'react'

export interface Props {
    children: ComponentType,
}

const BlankLayout: React.FC<Props> = (props) => {
    const { children } = props;

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default BlankLayout;