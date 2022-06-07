import React, { useEffect } from "react";
import {
    Dialog, createStyles,
    DialogContent, makeStyles, Theme, WithStyles, withStyles,
    Button, DialogActions, CircularProgress
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            color: '#000',
            top: 0,
            right: 0
        },
    });

interface IProps {
    handleCancel: () => void,
    open: boolean,
    handleConfirm: () => void,
    onClose?: () => void,
    title: string,
    description?: any,
    loading: boolean,
    labelConfirm?: string,
    labelCancel?: string,
    forceUpdate?: number,
    bodyOverflowY?: any
}

const defaultProps = {
    loading: false,
}

interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: any) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const useStyles = makeStyles({
    paper: {
        maxWidth: "100vw !important",
        width: "600px !important",
        overflowY: 'unset'
    },
    title: {
        borderBottom: '1px solid #B3B4B3',
        fontSize: '30px',
        padding: '16px 36px 16px 24px',

        '& > h6': {
            fontWeight: 600
        }
    },
    body: {
        borderBottom: 'solid 1px #B3B4B3',
        maxHeight: '300px',
        overflowY: 'auto'
    },
    description: {
        fontSize: '1rem',
    }
})

const PopupCustom = (props: IProps) => {
    const classes = useStyles();
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{ paper: classes.paper }}
        >
            <DialogTitle
                id="alert-dialog-title"
                className={classes.title}
                onClose={props.onClose}
            >{props.title}</DialogTitle>
            {
                props.description && (
                    <DialogContent className={classes.body}>
                        <div className={classes.description}>
                            {props.description}
                        </div>
                    </DialogContent>
                )
            }
            <DialogActions>
                {
                    props.labelCancel
                        ? (
                            <button onClick={props.handleCancel} className="btn sapo-btn-light">
                                {props.loading ? <CircularProgress style={{
                                    height: '20px',
                                    width: '20px'
                                }} /> : props.labelCancel ? props.labelCancel : 'Hủy bỏ'}
                            </button>
                        )
                        : null
                }
                {
                    props.handleConfirm && <button disabled={props.loading} onClick={props.loading ? () => {
                    } : props.handleConfirm} className="btn sapo-btn-default">
                        {props.loading ? <CircularProgress style={{
                            width: '20px',
                            height: '20px'
                        }} /> : props.labelConfirm ? props.labelConfirm : 'Đồng ý'}
                    </button>
                }
            </DialogActions>
        </Dialog>
    )
}

PopupCustom.defaultProps = defaultProps;

export default PopupCustom;
