import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HOME_PATH, USER_PATH, LOGIN_PATH, SEARCH_PATH } from "../../views";
import "./navBar.css";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from "../homePage/form/form";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import { UserContext } from '../../contexts/UserContext';

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

function NavBar() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { user, logout } = useContext(UserContext);
    console.log(user)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        setOpen(false);
    };

    return (

        <div className="topnav">
            {(user) ? (
                <>
                    <Link as={Link} to={HOME_PATH}>Home</Link>
                    <Link as={Link} to={USER_PATH}>Profile</Link>
                    <Link as={Link} to={SEARCH_PATH}>Search</Link>
                    <Link type="button" onClick={logout} to={LOGIN_PATH}>Logout</Link>
                    <div className={classes.root}>
                        <Button type="button" onClick={handleOpen} className="uploadButton" >Upload+</Button>
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
                                    <Form user={user} onClose={handleClose} />
                                </div>
                            </Fade>
                        </Modal>
                    </div>
                </>
            ) : (
                <Link as={Link} to={LOGIN_PATH}>Log In</Link>
            )}
        </div>
    )
}

export default NavBar;