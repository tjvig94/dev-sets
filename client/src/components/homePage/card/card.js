import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { brown } from '@material-ui/core/colors';
import { Modal, Button } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import "./card.css";


const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: brown[500],
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    style: {
        backgroundColor: "#cbc4b3",
    },
}));

export default function ContentCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLike = () => {

    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = "";
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach(byte => binary += String.fromCharCode(byte));
        return window.btoa(binary);
    }


    return (
        <Card className={clsx(classes.root, "postCard")} >
            <CardHeader
                className={classes.style}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        M
                        {/* if doesnt upload profile image, get first letter of username */}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    </IconButton>
                }
                title={props.post.title}
                subheader={props.post.desc}
            />
            <CardMedia
                className={classes.media}
                image={`data:${props.post.image.contentType};base64,${arrayBufferToBase64(props.post.image.data.data)}`}
                title={props.post.title}
            />
            <CardActions
                className={classes.style}
                disableSpacing
            >

                {/* <IconButton aria-label="add to favorites">

                    <FavoriteIcon onClick={handleLike} className="favoriteButton" />

                </IconButton> */}
                {/* 
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                <Button type="button" onClick={handleOpen} className="detailButton">
                    Details
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <img src={`data:${props.post.image.contentType};base64,${arrayBufferToBase64(props.post.image.data.data)}`} alt="temp" className="MuiCardMedia-img" style={{ height: "200", width: "400" }} />
                            <h2 id="transition-modal-title" >{props.post.title}</h2>
                            <Typography variant="overline" id="transition-modal-description">{props.post.desc}</Typography>
                        </div>
                    </Fade>
                </Modal>
            </CardActions>
        </Card>
    );
}