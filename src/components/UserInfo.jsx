import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Typography, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { readUser, userSelector } from '../store/userDummy';
import Loader from './Loader';

const useStyles = makeStyles({
    titles: {
        fontWeight: 800,
        textTransform: 'uppercase',
    },
    infoLine: {
        marginBottom: 10,
    },
    userProfile: {
        padding: '30px 60px',
        letterSpacing: 2,
    },
    userPic: {
        marginBottom: 30,
    },
});

const UserInfo = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userState = useSelector(userSelector);
    const { data, isLoading, error } = userState;

    const { id } = useParams();

    useEffect(() => {
        dispatch(readUser(id));
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!JSON.stringify(data) === '{}') {
        return <div>There is no user</div>;
    }

    const formattedDate = new Date(data.dateOfBirth).toLocaleDateString();

    return (
        <div className={classes.userProfile}>
            <img src={data.picture} alt="user" className={classes.userPic} />
            <Typography className={classes.infoLine}>
                <span className={classes.titles}>Name:</span> {data.firstName}{' '}
                {data.lastName}
            </Typography>
            <Typography className={classes.infoLine}>
                <span className={classes.titles}>Email:</span> {data.email}
            </Typography>
            <Typography className={classes.infoLine}>
                <span className={classes.titles}>Date of Birth:</span>{' '}
                {formattedDate}
            </Typography>
        </div>
    );
};

export default UserInfo;