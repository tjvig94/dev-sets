import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import "./uploadButton.css";
import Modal from '@material-ui/core/Modal';
import Form from "../homePage/form/form";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            backgroundColor: "#cbc4b3",
            color: "black",
            "&:hover": {
                backgroundColor: "#6b645d",
                color: "white"
            }
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#cbc4b3",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function UploadButton() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <AddIcon type="button" onClick={handleOpen} />
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
                        <Form />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default UploadButton;