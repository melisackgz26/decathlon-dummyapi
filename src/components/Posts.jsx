import React, { useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { readPosts, postsSelector } from '../store/postsDummy';
import Loader from './Loader';
import PostCard from './PostCard';

const Posts = () => {
    const dispatch = useDispatch();
    const postsState = useSelector(postsSelector);
    const { data, isLoading, error } = postsState;

    useEffect(() => {
        dispatch(readPosts());
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!data.length) {
        return <div>There are no posts</div>;
    }

    return (
        <Box mx={4}>
            <Grid container spacing={3}>
                {data.map((post) => (
                    <Grid item xs={12} sm={6} md={3} key={post.id}>
                        <PostCard post={post} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Posts;