import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Container } from "@material-ui/core";
import ContentCard from "./card/card";
import API from '../../utils/API';


function HomePage({ user }) {
    const [cardArray, setCardArray] = useState([]);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        API.getPosts().then(res => {
            setPostData(res.data);
        });
        setCardArray(postData);

    }, [postData]);

    return (
        <div>
            <Container maxWidth="lg" className="homeContent">
                {cardArray.map(post => (
                    <ContentCard post={post} key={post.id} />
                ))}
            </Container>
        </div>
    )
};

export default HomePage;
