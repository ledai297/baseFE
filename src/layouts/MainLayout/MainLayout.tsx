import React, { ComponentType} from 'react';
import Menu from '../../components/Menu';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Theme, DrawerProps, Container, CssBaseline, AppBar, Toolbar} from '@material-ui/core';
import clsx from 'clsx';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { NavBar } from '../../components/NavBar/NavBar';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        app: {
            flexGrow: 1,
            background: '#f2f4f8',
            fontSize: "13px",
            zIndex: theme.zIndex.drawer + 2,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            // marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            ...theme.mixins.toolbar,
        },
        headerArrow: {
            float: "left",
            marginLeft: "5px"
        },
        headerText: {
            float: "left",
            fontWeight: "bold",
            color: "black"
        },
        menuIcon: {
            marginLeft: '-24px',
            padding: '10px 0px',
            backgroundColor: '#18202c',
            marginRight: 25,
            cursor:'pointer',
            width: 39,
        },
    });

const drawerWidth = 200;
const drawerColor = "#18202c";

export interface IProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {
    children: ComponentType
}

const MainLayout: React.FC<IProps> = (props) => {
    const { children, classes } = props;
    const [open, setOpen] = React.useState(true);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ boxShadow: "unset", minHeight:"50px", height:"50px" }}
            >
                <Toolbar style={{ backgroundColor: "#F2F4F8", minHeight:"50px", height:"50px" }}>
                    <div className={clsx(classes.menuIcon, {
                            [classes.hide]: open,
                        })}  onClick={() => setOpen(true)}>
                        <img src="/images/icons/logo-sapo.svg" alt="" style={{width:"53%"}}/>
                        <DoubleArrowIcon style={{width:'12px', marginLeft:'3px', marginRight:'3px'}} />
                    </div>               
                </Toolbar>
            </AppBar>
            <Menu
                PaperProps={{ style: { backgroundColor: drawerColor } }}
                open={open}
                handleDrawerClose={() => setOpen(false)}
            />
            <main className={classes.app}>
                <NavBar/>
                <Container maxWidth={false}>
                    {children}
                </Container>
            </main>
            
        </div>
    );
}
export default withStyles(styles)(MainLayout);
