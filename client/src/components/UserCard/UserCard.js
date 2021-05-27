import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardHeader, CardMedia, Avatar } from '@material-ui/core';
import './UserCard.css';

const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    style: {
        backgroundColor: "#cbc4b3"
    }
}));

function UserCard({ user }) {
    const classes = useStyles();
    return(
        <Card className={clsx(classes.root, 'user-card')} >
            <CardHeader 
                className={classes.style}
                title={user.name}
                avatar={
                    <Avatar aria-label={user.name} src={user.pfp}/>
                }
            />
        </Card>
    )
}

export default UserCard;
