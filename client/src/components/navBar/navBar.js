import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HOME_PATH, USER_PATH, LOGIN_PATH } from "../../views";
import "./navBar.css";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from "../homePage/form/form";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from "clsx";
import Button from "@material-ui/core/Button";

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

function NavBar({ user }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div className="topnav">
            <Link as={Link} to={HOME_PATH}>Home</Link>
            <Link as={Link} to={LOGIN_PATH}>Log In</Link>
            <Link as={Link} to={USER_PATH}>Profile</Link>
            <input type="text" placeholder="Search.."></input>

            <div className={clsx(classes.root, "uploadButton")}>
                <Button type="button" onClick={handleOpen} className="addIcon" >
                    Upload+
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
                            <Form user={user} />
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default NavBar;