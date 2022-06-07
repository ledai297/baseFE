import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './LinearProgressCustom.styles.scss';

interface IProps {
    loading: Boolean,
}

const LinearProgressCustom: React.FC<IProps> = (props: IProps) => {

    return (
        <div className="wrapper-progress">
            {
                props.loading ? (<LinearProgress color="secondary" />) : null
            }
        </div>
    )
}

export default LinearProgressCustom;
