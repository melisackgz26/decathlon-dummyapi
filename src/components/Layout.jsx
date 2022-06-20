import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Header from './Header';

const useStyles = makeStyles({
    main: {
        margin: '90px 0 50px',
    },
});

const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline />
            <Header />
            <main className={classes.main}>{children}</main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Layout;