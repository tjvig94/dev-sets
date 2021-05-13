import React from "react";
import "./homePage.css";
import { Container } from "@material-ui/core"
import ContentCard from "./card/card"


function HomePage() {

    return (
        <Container maxWidth="sm" className="homeContent">
            <ContentCard />
        </Container>
    )
}

export default HomePage;