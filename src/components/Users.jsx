import React, { useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { readUsers, usersSelector } from '../store/usersDummy';
import Loader from './Loader';
import UserCard from './UserCard';

const Users = () => {
    const dispatch = useDispatch();
    const usersState = useSelector(usersSelector);
    const { data, isLoading, error } = usersState;

    useEffect(() => {
        dispatch(readUsers());
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!data.length) {
        return <div>There are no users</div>;
    }

    return (
        <Box mx={4}>
            <Grid container spacing={3}>
                {data.map((user) => (
                    <Grid item xs={12} sm={6} md={3} key={user.id}>
                        <UserCard user={user} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Users;