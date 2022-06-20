import React from 'react';
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

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

const UserCard = ({ user }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea component={RouterLink} to={`/user/${user.id}`}>
                <CardMedia
                    component="img"
                    height="100"
                    image={user.picture}
                    style={{ objectFit: 'contain' }}
                    alt="users"
                />
                <CardContent>
                    <Typography variant="subtitle1" className={classes.title}>
                        {user.firstName} {user.lastName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        picture: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
};

const defaultProps = {};
UserCard.defaultProps = defaultProps;

export default UserCard;