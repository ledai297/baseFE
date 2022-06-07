
import React, { forwardRef, FC } from 'react';
import { NavLink as RouterLink, NavLinkProps, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, createStyles, WithStyles, withStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors, Theme, DrawerProps } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    button: {
      color: colors.blueGrey[800],
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
      //color: theme.palette.icon,
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: theme.palette.primary.main
      }
    }
  });
export interface NavigatorProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {
  pages: {
    title: string;
    href: string;
    icon: any;
  }[]
}
const SidebarNav: FC<NavigatorProps> = (props) => {
  const { pages, className, classes, ...rest } = props;
  return (
    <List
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props} innerRef={ref} />)}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};
export default withStyles(styles)(SidebarNav);
