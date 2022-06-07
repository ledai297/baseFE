import React, {ReactElement} from 'react';
import Container from '@material-ui/core/Container';
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
        },
        main: {
            flex: 1,
            padding: theme.spacing(6, 4)
        },
        '@media (min-width: 601px)': {
            main: {
                display: 'block',
                flexShrink: 0,
                margin: '0 auto',
                transition: '.2s',
                width: 550
            }
        },
        footer: {
            padding: theme.spacing(2),
            background: '#eaeff1',
        },
    });

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Sapo Pay Admin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

interface LayoutProps extends WithStyles<typeof styles> {
    children: ReactElement
}

function AuthLayout(props: LayoutProps) {
    const {classes, children} = props;

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container>{children}</Container>
            </main>
            <footer className={classes.footer}>
                <Copyright />
            </footer>
        </div>
    );
}

export default withStyles(styles)(AuthLayout);
