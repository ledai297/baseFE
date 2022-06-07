import React, { forwardRef, Fragment, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { Drawer, Theme, DrawerProps, ListItem, List, ListItemIcon, ListItemText, Collapse, useTheme, Popover, Paper, ClickAwayListener, MenuList, MenuItem, Button, Popper } from '@material-ui/core';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import '../../style/default.scss';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { menuItems } from './MenuModel';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { authActions } from '../../contexts/auth/AuthActions';
import { AuthenticatedUser } from '../../contexts/auth/AuthenticatedUser';

const drawerWidth = 200;
const styles = (theme: Theme) =>
    createStyles({
        categoryHeader: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        categoryHeaderPrimary: {
            color: theme.palette.common.white,
        },
        item: {
            padding: '1px 8px',
            height: 50,
            borderBottom: 1,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover,&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&.active': {
                color: '#4fc3f7',
            },
            fontSize: 13
        },
        itemCategory: {
            backgroundColor: '#232f3e',
            boxShadow: '0 -1px 0 #404854 inset',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        firebase: {
            fontSize: 24,
            color: theme.palette.common.white,
        },
        itemPrimary: {
            fontSize: 13,
            fontWeight:500
        },
        itemPrimarySub: {
            fontSize: 13,
            fontWeight:100
        },
        itemIcon: {
            minWidth: 'auto',
            marginRight: theme.spacing(1),
            color: 'rgba(255, 255, 255, 0.7)',
        },
        divider: {
            marginTop: theme.spacing(2),
        },
        nested: {
            paddingLeft: 10,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover,&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&.active': {
                color: '#4fc3f7',
            }
        },
        drawer: {
            // width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: '40px',
        },
        toolbar1: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            minHeight:'50px !important',
            height:'50px !important',
        },
        chevronLeft: {
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '15px',
            marginRight: '-15px'
        }
    });
interface IProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {
    handleDrawerClose: () => void
    open: boolean
}
const Menu: React.FC<IProps> = (props) => {
    const { classes, handleDrawerClose,  ...other } = props;
    const theme = useTheme();
    const [currentOpenId, setCurrentOpenId] = React.useState<number>();
    let location = useLocation();
    const [username, setUserName] = useState<string>("");
    const { state, dispatch } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const openPopup = Boolean(anchorEl);
    const id = openPopup ? 'simple-popover' : undefined;
    const handleClickMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let id = event.currentTarget.getAttribute("id");
        if (id !== null) {
            setCurrentOpenId(parseInt(id));
            if (currentOpenId && id && parseInt(id) === currentOpenId) {
                setCurrentOpenId(undefined)
            }
        }
    };
    useEffect(() => {
        if (state.user instanceof AuthenticatedUser) {
            setUserName(state.user.username);
        }
    }, [state.user])
    useEffect(() => {
        menuItems.forEach((item) => {
            if (item.subMenus !== undefined) {
                item.subMenus?.forEach((subMenu) => {
                    if (location.pathname === subMenu.path) {
                        setCurrentOpenId(item.id);
                    }
                })
            }
        })
    }, [])    

    return (
        <Drawer variant="permanent" {...other}
            className={clsx('menuPrimary', classes.drawer, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}>
            <div className={classes.toolbar1} style={{minHeight:"50px !important"}}>
                {/* <img src="/images/icons/admin-logo.svg" alt="" style={{ width: "75%" }} /> */}
                <img src="/images/icons/logo.svg" alt="" style={{ maxWidth: "80%" }} />
                <div className={classes.chevronLeft} onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </div>
            </div>
            <List style={{paddingTop:"0px", paddingBottom:"50px"}}>
                {menuItems.map(({ id, name, icon: Icon, path, subMenus }, index) => (
                    <Fragment key={index}>
                        <ListItem
                            button
                            className={classes.item}
                            onClick={handleClickMenu}
                            id={id.toString()}
                        >
                            <ListItemIcon className={classes.itemIcon}>
                                <img src={Icon} />
                            </ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary: classes.itemPrimary,
                                }}
                            >
                                {name}
                            </ListItemText>
                            {
                                currentOpenId === id ? <ExpandLess /> : <ExpandMore />
                            }
                        </ListItem>
                        {
                            <Collapse in={currentOpenId === id} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        subMenus?.map((subMenu) => (
                                            <ListItem
                                                key={subMenu.path}
                                                button
                                                className={classes.nested}
                                                component={forwardRef((props: NavLinkProps, ref: any) => <NavLink {...props} innerRef={ref} />)}
                                                to={subMenu.path}
                                            >
                                                <ListItemText classes={{ primary: classes.itemPrimarySub }}>{subMenu.name}</ListItemText>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        }
                    </Fragment>
                ))}
            </List>
            <div style={{ flexGrow: 1 }} />
            {
                props.open ?
                    <div className="sapo-menu-detail-acount">
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <Button
                                aria-describedby={id}
                                onClick={handleClick}
                                style={{ color: "white", textAlign: "left", justifyContent: "unset", paddingLeft: "20px", height: "40px", borderRadius: '0' }}
                            >
                                {username}
                            </Button>
                            
                        </div>
                        
                        <Popover
                            id="popover-menu"
                            open={openPopup}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 0, left: 20 }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}

                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={openPopup} id="menu-list-grow">
                                        <MenuItem onClick={handleClose}>
                                            {/* <Link component={RouterLink} to={`/admin/account`}>Hồ sơ cá nhân</Link> */}
                                            <a href="/admin/account" style={{textDecoration:"unset", color:"#263238"}}>Hồ sơ cá nhân</a>
                                        </MenuItem>
                                        <MenuItem onClick={() => dispatch({ type: authActions.LOGOUT, payload: null })}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Popover>
                    </div>
                    :
                    <></>
            }


        </Drawer>
    );
}

export default withStyles(styles)(Menu);
