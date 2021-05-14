import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Container } from "@material-ui/core";
import ContentCard from "./card/card";
import Form from "./form/form";

// database query for random

const dummyData = [
    {
        title: "The Village",
        description: "Resident Evil",
        image: "https://via.placeholder.com/150",
        id: "1",
        user: {
            id: "",
            name: "John",
            image: ""
        }
    },
    {
        title: "Destiny 2",
        description: "Outer world shooter",
        image: "https://via.placeholder.com/150",
        id: "2",
        user: {
            id: "",
            name: "Joe",
            image: ""
        },
    },
    {
        title: "League of Legends",
        description: "pain",
        image: "https://via.placeholder.com/150",
        id: "3",
        user: {
            id: "",
            name: "Chad",
            image: ""
        }
    }
]

function HomePage() {
    const [cardArray, setCardArray] = useState([]);

    useEffect(() => {
        setCardArray(dummyData)
    }, [])


    return (
        <Container maxWidth="sm" className="homeContent">
            {cardArray.map(post => (
                <ContentCard post={post} key={post.id} />
            ))}

            <Form />
        </Container>
    )
}

export default HomePage;




//     API.getDogsOfBreed(this.state.search)
// .then(res => {
//     if (res.data.status === "error") {
//       throw new Error(res.data.message);
//     }
//     this.setState({ results: res.data.message, error: "" });
//   })
//   .catch(err => this.setState({ error: err.message }));