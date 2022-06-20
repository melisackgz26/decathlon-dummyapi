import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Typography, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './Loader';
import { postSelector, readPost } from '../store/postDummy';

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
    mainPostPic: {
        marginBottom: 30,
        maxHeight: 300,
        borderRadius: 10,
    },
    authorSection: {
        display: 'flex',
        marginBottom: 20,
    },
    authorPic: {
        maxHeight: 50,
        borderRadius: '50%',
    },
    authorInfo: {
        textTransform: 'uppercase',
        marginLeft: 26,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    authorName: {
        fontWeight: 'bold',
        fontSize: 13,
    },
});

const PostInfo = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const postState = useSelector(postSelector);
    const { data, isLoading, error } = postState;

    const { id } = useParams();

    useEffect(() => {
        dispatch(readPost(id));
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!JSON.stringify(data) === '{}') {
        return <div>No posts found</div>;
    }

    const formattedDate = new Date(data.publishDate).toLocaleDateString();

    return (
        <div className={classes.userProfile}>
            <img src={data.image} alt="post" className={classes.mainPostPic} />
            <div className={classes.authorSection}>
                <img
                    src={data.owner?.picture}
                    alt="author"
                    className={classes.authorPic}
                />
                <div className={classes.authorInfo}>
                    <Typography className={classes.authorName}>
                        {data?.owner?.firstName} {data?.owner?.lastName}
                    </Typography>
                    <Typography>{formattedDate}</Typography>
                </div>
            </div>
            <Typography className={classes.infoLine}>
                <span className={classes.titles}>POST:</span> {data.text}{' '}
            </Typography>

            <Typography className={classes.infoLine}>
                <span className={classes.titles}>TAGS:</span>{' '}
                {data.tags?.join(', ')}
            </Typography>

            {data.link && (
                <Typography className={classes.infoLine}>
                    <span className={classes.titles}>LINK:</span>{' '}
                    <a href={data?.link}>{data?.link}</a>
                </Typography>
            )}
        </div>
    );
};

export default PostInfo;