import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition';


export interface Props {
    open: boolean,
    onClose(): void,
    imageUrl: string
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref}/>;
  });

function ImageViewDialog(props: Props) {
    const { open, onClose, imageUrl } = props;
    const handleCancel = () => {
        onClose();
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            open={open}
            TransitionComponent={Transition}
        >
            <DialogTitle id="confirmation-dialog-title">Chi tiết ảnh</DialogTitle>
            <DialogContent dividers>
                <Box display="flex" justifyContent="center">
                    <img src={imageUrl} alt="detail"/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} variant="outlined">
                    <Typography >Thoát</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ImageViewDialog;
