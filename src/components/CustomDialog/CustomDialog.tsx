import React, { Fragment } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import './custom-dialog.scss';

export const CustomDialog = (props:any) => {
    const { handleCancel, status, handleConfirm, handleClose, title, description } = props;
    return (
        <Fragment>
            <Dialog
                open={status}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent id="alert-dialog-content">
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <button onClick={handleCancel} className="btn">
                    Hủy bỏ
                </button>
                <button onClick={handleConfirm} className="btn sapo-btn-default" autoFocus>
                    Xác nhận
                </button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default CustomDialog;