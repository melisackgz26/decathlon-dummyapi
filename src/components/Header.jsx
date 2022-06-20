import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        padding: 0,
        margin: 0,
    },
    title: {
        margin: '0 14px',
        letterSpacing: 2,
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textDecoration: 'none',
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <NavLink to="/users" as={Link} className={classes.link}>
                        <Typography variant="h6" className={classes.title}>
                            User Page
                        </Typography>
                    </NavLink>
                    <NavLink to="/posts" as={Link} className={classes.link}>
                        <Typography variant="h6" className={classes.title}>
                            Post Page
                        </Typography>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;