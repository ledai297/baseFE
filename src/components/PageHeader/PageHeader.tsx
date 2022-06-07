import React from 'react';
import './PageHeader.styles.scss';

interface IProp {
    title: any,
    actionGroup?: any,
}
const PageHeader: React.FC<IProp> = (props: IProp) => {
    const { title, actionGroup} = props;
    return (
        <div className="page-header">
            <div className="title-wrapper">
                <span className="title">{title}</span>
            </div>
            <div className="action-group-wrapper">
                {actionGroup}
            </div>
        </div>
    )
}

export default PageHeader;