import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Container } from "@material-ui/core";
import ContentCard from "./card/card";
import API from '../../utils/API';

function HomePage() {

    const [cardArray, setCardArray] = useState([]);

    useEffect(() => {
        API.getPosts().then(res => {
            setCardArray(res.data);
        });
    }, [cardArray]);

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
