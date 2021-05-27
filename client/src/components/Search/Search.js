import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Search.css';
import { Container, Input, Button, Grid } from '@material-ui/core';
import API from '../../utils/API';
import ContentCard from '../homePage/card/card';
import UserCard from '../UserCard/UserCard';

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
    const [userCards, setUserCards] = useState([]);
    const [postCards, setPostCards] = useState([]);

    useEffect(() => {
        setPostCards(postResults);
        setUserCards(userResults);
    }, [userResults, postResults]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!search) return;

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
                </form>
            </Container>
            <Container maxWidth="lg" className="homeContent">            
                <Grid container spacing={2}>   
                    <Grid item xs={4}>
                        <h2>Posts</h2>
                        {postCards.map(post => (
                            <ContentCard post={post} key={post.id} />
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                        <h2>Users</h2>
                        {userCards.map(user => (
                            <UserCard user={user} key={user.uid} />
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                        <h2>Projects</h2>
                        {/* Project cards will go here. */}
                    </Grid>                   
                </Grid>
            </Container> 
        </div>
    )
}

export default Search;
