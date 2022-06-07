import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import { useForm } from 'react-hook-form';
import { authenticationService } from '../../services/authentication/authenticationService';
import { Redirect, useHistory } from 'react-router-dom';
import ValidationErrorWrapper from '../../components/ValidationError/ValidationErrorWrapper';
import { useSnackbar } from "notistack";
import { optionSnackbarError } from "../../utilities/Option";
import { AuthContext } from '../../contexts/auth/AuthContext';
import { ErrorForbidden } from "../../utilities/ErrorForbidden";
import { SecurityUtil } from "../../utilities/SecurityUtil";
import { tokenStorage } from "../../utilities/tokenStorage";


const styles = (theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            flexGrow: 1
        },
        '@media (min-width: 610px)': {
            paper: {
                height: 'auto',
                minHeight: 400,
                overflowY: 'auto',
                transition: '.2s'
            }
        },
        '@media (min-width: 450px)': {
            paper: {
                padding: '48px 40px 36px'
            }
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        tail: {
            marginTop: theme.spacing(2),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    });

export interface SignInProps extends WithStyles<typeof styles> {
    history: any
}

const Signin: React.FC<SignInProps> = (props: SignInProps) => {
    const { classes } = props;

    const { register, handleSubmit, watch, errors, control } = useForm({ mode: "onBlur" });

    let history = useHistory();

    const { state, dispatch } = useContext(AuthContext);

    const { enqueueSnackbar } = useSnackbar();

    const submit = (data: any) => {
        // authenticationService.authenticate(data)
        //     .then(() => {
        //         let authorities = SecurityUtil.getAuthorities();
        //         if (!(authorities.includes('ROLE_ADMIN') || authorities.includes('ROLE_SUPER_ADMIN') || authorities.includes('ROLE_SALE_MANAGER') || authorities.includes('ROLE_TESTER'))) {
        //             enqueueSnackbar("Không có quyền truy cập hoặc thao tác", optionSnackbarError);
        //             tokenStorage.clearToken();
        //             return;
        //         }
        //         // history.push("/admin/products");
        //         window.location.href = "/admin/sellers";
        //         // authContext.getCurrentAccount();
        //     }
        //     )
        //     .catch(
        //         error => {
        //             if (error instanceof ErrorForbidden) {
        //                 enqueueSnackbar(error.message, optionSnackbarError);
        //                 return;
        //             }
        //             enqueueSnackbar("Có lỗi xảy ra. Vui lòng kiểm tra lại username và password", optionSnackbarError)
        //         }
        //     );
        window.location.href = "/admin/sellers";
    };
    return (
        !state.isAuthenticated ? (<Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                Đăng nhập
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(submit)}>
                <TextField
                    inputRef={register({ required: true  })}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email*"
                    name="username"
                    autoComplete="email"
                    autoFocus
                />
                <ValidationErrorWrapper>
                    {errors.username?.type === "required" &&
                        "Email is required"}
                    {errors.username?.type === "pattern" &&
                        "Invalid email format"}
                </ValidationErrorWrapper>


                <TextField
                    inputRef={register({ required: true, minLength: 4, maxLength: 16 })}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password*"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <ValidationErrorWrapper>
                    {errors.password?.type === "required" &&
                        "Password is required"}
                    {errors.password?.type === "minLength" &&
                        "Password's length must be between 4 and 16"}
                    {errors.password?.type === "maxlength" &&
                        "Password's length must be between 4 and 16"}
                </ValidationErrorWrapper>


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
            </form>
        </Paper>) : <Redirect to='/admin/products' />
    )
}

export default withStyles(styles)(Signin);