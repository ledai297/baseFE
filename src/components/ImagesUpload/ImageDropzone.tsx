import React, {ChangeEvent} from 'react'
import { Box, Typography, createStyles, WithStyles, withStyles } from '@material-ui/core'
import ImageBox from '../ImageBox';
import Dropzone from 'react-dropzone';
import { DragText } from '../SVG';
import { ImageItem } from './type'
import clsx from 'clsx';

const styles = () =>
    createStyles({
        root: {
        },
        gridBox: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gridGap: '10px',
            gridAutoRows: '80px',
            gridAutoFlow: 'dense',
            padding: '10px'
        },
        gridItemDouble: {
            gridColumnEnd: 'span 2',
            gridRowEnd: 'span 2',
        },
        gridItemAll: {
            gridRowEnd: 'span 2',
            gridColumn: '1/-1',
            gridTemplateRows: 'auto',
        },
        cursorPointer: {
            cursor: "pointer"
        }
    });

export interface HoverActionComponentProps {
    image: ImageItem
}

export interface Props extends WithStyles<typeof styles> {
    onDropAccepted?(files: File[]): void,
    onDropRejected?(files: File[]): void,
    images: ImageItem[],
    hoverActionComponent: React.ComponentType<HoverActionComponentProps>
}

function ImageDropzone (props: Props) {
    const { images, onDropAccepted, onDropRejected, classes, hoverActionComponent : HoverActionComponent } = props;

    return (
        // <Dropzone accept="image/*" noClick={images.length !== 0} onDropAccepted={onDropAccepted} onDropRejected={onDropRejected} multiple={false} noKeyboard={true}>
        <Dropzone accept="image/*" noClick={images.length !== 0} onDropAccepted={onDropAccepted}  multiple={false} noKeyboard={true}>
            {({ getRootProps, getInputProps }) => (
                <Box {...getRootProps({ className: classes.gridBox })}>
                    <input {...getInputProps()}/>
                    {
                        images.length === 0 ? (
                            <Box className={clsx(classes.gridItemAll, classes.cursorPointer) } p={2}>
                                <Box width={120} my={2} mx="auto" className={classes.cursorPointer}>
                                    <DragText/>
                                </Box>
                                <Typography color="textSecondary" align="center">Thả file ảnh vào đây để thêm mới</Typography>
                            </Box>
                        ) :
                            images.map((image, index) => (
                                <Box key={image.localId} className={index === 0 ? classes.gridItemDouble : ""}>
                                    <ImageBox imageUrl={image.url !== undefined ? image.url : image.localUrl}
                                        width={"100%"} height={"100%"}
                                        hoverActionComponent={(
                                            <HoverActionComponent image={image} />
                                        )}
                                    />
                                </Box>
                            ))
                    }
                </Box>
            )}
        </Dropzone>
    )
}


export default withStyles(styles)(ImageDropzone);
