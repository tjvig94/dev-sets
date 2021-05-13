import React from "react";
import "./homePage.css";
import { Container } from "@material-ui/core"
import ContentCard from "./card/card"
import Form from "./form/form"

function HomePage() {

    return (
        <Container maxWidth="sm" className="homeContent">
            <ContentCard />
            <Form />
        </Container>
    )
}

export default HomePage;