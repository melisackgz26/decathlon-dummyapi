import React, { useState } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    makeStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    img: {
        objectFit: 'cover',
        minHeight: 200,
    },
    infoSection: {
        minHeight: 110,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    likesAndDateSection: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    likeIcon: {
        height: 16,
    },
    likesSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 40,
    },
});

const PostCard = ({ post }) => {
    const classes = useStyles();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = new Date(post.publishDate).toLocaleDateString(
        'en-US',
        options
    );

    const [likesNumber, setLikesNumber] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikes = () => {
        setLikesNumber(isLiked ? likesNumber - 1 : likesNumber + 1);
        setIsLiked(!isLiked);
    };

    return (
        <Card>
            <CardActionArea component={RouterLink} to={`/post/${post.id}`}>
                <CardMedia
                    component="img"
                    height="100"
                    image={post.image}
                    className={classes.img}
                    alt="posts"
                />
            </CardActionArea>
            <CardContent className={classes.infoSection}>
                <Typography variant="body2">{post.text}</Typography>
                <div className={classes.likesAndDateSection}>
                    <Typography
                        variant="caption"
                        className={classes.likesSection}
                    >
                        {isLiked ? (
                            <FavoriteIcon
                                className={classes.likeIcon}
                                onClick={handleLikes}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                className={classes.likeIcon}
                                onClick={handleLikes}
                            />
                        )}{' '}
                        {likesNumber}
                    </Typography>
                    <Typography variant="caption">{formattedDate}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        image: PropTypes.string,
        likes: PropTypes.number,
        publishDate: PropTypes.string,
        owner: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            picture: PropTypes.string,
        }),
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

PostCard.defaultProps = {};

export default PostCard;