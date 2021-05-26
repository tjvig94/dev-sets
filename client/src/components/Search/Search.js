import React, { useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Search.css';
import { Container, Input } from '@material-ui/core';
import API from '../../utils/API';

const useStyles = makeStyles({
    root: {
        color: 'white'
    }
});

const Search = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [postResults, setPostResults] = useState([]);

    useEffect(() => {
        loadPosts();
        loadUsers();
    }, []);

    const loadPosts = () => {
        API.getPosts().then(res => {
            setPostResults(res.data);
        });
    };

    const loadUsers = () => {
        API.getUsers().then(res => {
            setUserResults(res.data)
        });
    };

    return(
        <div>
            <Container maxWidth="lg" className="homeContent">
                <h1>Search for Users, DevSets, and Projects:</h1>
                <Input 
                    fullWidth="true"
                    placeholder="Search"
                    color="secondary"
                    className={classes.root}
                />
            </Container>
        </div>
    )
}

export default Search;
