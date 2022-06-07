import React from 'react';
import './Validation.styles.scss'

const ValidationErrorWrapper: React.FC<any> = ({children}) => {
    return (
        <div className="validation-errors-wrapper">
            {children}
        </div>
    )
}

export default ValidationErrorWrapper;