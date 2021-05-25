import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Container } from "@material-ui/core";
import ContentCard from "./card/card";
import API from '../../utils/API';

function HomePage() {

    const [cardArray, setCardArray] = useState([]);

    useEffect(() => {
        API.getPosts().then(res => {
            const sortedCards = sortByDate(res.data);
            setCardArray(sortedCards);
        });
    }, []);

    function sortByDate(cardArray) {
        return cardArray.map(card => {
            const dateString = card.date.split('/').reverse().toString();
            const dateTimestamp = Date.parse(dateString);
            card.date = dateTimestamp;
            return card;
        }).sort((a, b) => b.date - a.date);
    }

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
