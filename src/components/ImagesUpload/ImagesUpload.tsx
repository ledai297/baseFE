import React, {useState, useCallback} from 'react'
import {Box, Typography, IconButton, Popover, TextField, Button} from '@material-ui/core'
import { Delete, RemoveRedEye } from '@material-ui/icons';
import ImageViewDialog from './ImageViewDialog';
import ImageDropzone, { HoverActionComponentProps } from './ImageDropzone';
import { ImageItem } from './type'

export interface Props {
    onDropAccepted?(files: File[]): void,
    onDropRejected?(files: File[]): void,
    onDelete?(localId: string): void,
    addImageURL(url?: string): void,
    title: string,
    images: ImageItem[]
}

function ImagesUpload(props: Props) {
    const { onDropAccepted, onDropRejected, images, onDelete, title, addImageURL } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [imageViewDialogOpen, setImageViewDialogOpen] = useState<boolean>(false);
    const [imageViewUrl, setImageViewUrl] = useState<string>("");

    const openImageViewDialog = useCallback(
        (image: ImageItem) => {
            let imageUrl = null;
            if (image.localUrl) {
                imageUrl = image.localUrl
            } else if (image.url) {
                imageUrl = image.url;
            }

            if (imageUrl != null && imageUrl !== "") {
                setImageViewDialogOpen(true);
                setImageViewUrl(imageUrl)
            }
        },
        [],
    );

    const closeImageViewDialog = useCallback(
        () => {
            setImageViewDialogOpen(false);
            setImageViewUrl("");
        },
        [],
    );


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <Box p={2} pb={4}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle2">{title}</Typography>
                    <Typography style={{cursor: "pointer"}} color="primary" onClick={handleClick}>Thêm ảnh từ URL</Typography>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box p={3} pt={1} style={{display: "flex", alignItems: "baseline"}}>
                            <TextField id="input-url" name="url" style={{marginRight: 24, minWidth: 300}} label="Nhập URL" />
                            <Button color="primary" variant="contained" onClick={() => {
                                addImageURL((document.getElementById("input-url") as HTMLInputElement).value);
                                handleClose();
                            }}>Thêm</Button>
                        </Box>
                    </Popover>
                </Box>
                <ImageDropzone
                    images={images}
                    onDropAccepted={onDropAccepted}
                    onDropRejected={onDropRejected}
                    hoverActionComponent={(props: HoverActionComponentProps) => (
                        <Box display="flex" justifyContent="center" alignItems="flex-end" height="100%">
                            <IconButton size="small" onClick={() => openImageViewDialog(props.image)}>
                                <RemoveRedEye/>
                            </IconButton>
                            {onDelete &&
                            <IconButton size="small" onClick={() => onDelete(props.image.localId)}>
                                <Delete/>
                            </IconButton>
                            }
                        </Box>
                    )}
                />
            </Box>
            <ImageViewDialog open={imageViewDialogOpen}
                             onClose={() => { closeImageViewDialog() }}
                             imageUrl={imageViewUrl} />
        </Box>
    );
}

export default ImagesUpload;
