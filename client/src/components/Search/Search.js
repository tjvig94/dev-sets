import React, { useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Search.css';
import { Container, Input, Button } from '@material-ui/core';
import API from '../../utils/API';
import axios from 'axios';

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
        console.log(userResults);
        console.log(postResults);
    }, [userResults, postResults])

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // User Search
        const userSearch = await API.getUsers(search);
        setUserResults(userSearch.data);

        // Post Search
        const postSearch = await API.getPostsByTitle(search);
        setPostResults(postSearch.data);
    }

    return(
        <div>
            <Container maxWidth="lg" className="homeContent">
                <h1>Search for Users, DevSets, and Projects:</h1>
                <form onSubmit={(search) => handleSubmit(search)} id="search-form">
                    <Input 
                        fullWidth="true"
                        placeholder="Search"
                        color="secondary"
                        className={classes.root}
                        name="search"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <Button type="submit" variant="contained">Submit</Button>
                </form>
                <h2>Check the console!</h2>  
            </Container>
        </div>
    )
}

export default Search;
