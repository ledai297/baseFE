import React, { ReactElement } from 'react';
import { Box, CardMedia, createStyles, withStyles, WithStyles } from '@material-ui/core';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import { grey } from '@material-ui/core/colors';
import clsx from 'clsx';

const styles = () =>
    createStyles({
        root: {
        },
        box: {
            backgroundColor: '#fafbfc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: grey[300],
            color: grey[400],
            overflow: 'hidden'
        },
        boxBlur: {
            '&:hover $cardMedia': {
                filter: "blur(8px)"
            },
            '&:hover $boxAction': {
                display: 'block'
            }
        },
        cardMedia: {
            width: '100%',
            paddingTop: '100%',
            backgroundSize: 'contain'
        },
        boxAction: {
           display: 'none',
           width: '100%',
           height: '100%'
        }
    });

interface Props extends WithStyles<typeof styles> {
    imageUrl?: string,
    width: number | string,
    height: number | string,
    hoverActionComponent?: ReactElement
}

const ImageBox: React.FC<Props> = (props) => {
    const { classes, imageUrl, width, height, hoverActionComponent } = props;

    const boxClass = hoverActionComponent ? clsx(classes.box, classes.boxBlur) : classes.box;

    return (
        <Box className={boxClass} width={width} height={height} position="relative">
            {imageUrl === undefined ? (
                <PanoramaOutlinedIcon color="inherit" />
            ) :
                (
                    <CardMedia className={classes.cardMedia} image={imageUrl}/>
                )}
            <Box className={classes.boxAction} position="absolute" top={0} left={0}>
                {hoverActionComponent}
            </Box>
        </Box>
    );
};

export default withStyles(styles)(ImageBox);
