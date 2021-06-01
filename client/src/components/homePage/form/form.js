import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import "./form.css";
import storage, { db, firebase } from '../../../firebase';
import axios from '../../../utils/axios';
import { UserContext } from '../../../contexts/UserContext';



function Form({ onClose }) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        setFile(event.target.files[0])
    };

    const changeTitle = (event) => {
        setTitle(event.target.value)
    };

    const changeDesc = (event) => {
        setDesc(event.target.value)
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        //Create uuid 
        const imageRef = db.collection('images').doc();
        // npm nano id or uuid if else, to generate id beforehand

        // send image to firebase storage, and get reference url
        await storage.ref(`/images/${imageRef.id}_${file.name}`).put(file);
        const imageUrl = await storage.ref('images').child(imageRef.id + '_' + file.name).getDownloadURL();

        // create formdata to send to database 
        const formData = {
            user: user.uid,
            name: user.displayName,
            pfp: user.photoURL,
            fileName: file.name,
            title: title,
            desc: desc,
            image: imageUrl,
            likes: 0
        }
        setIsLoading(true)
        console.log(formData);
        await axios.post('/api/post', formData);
        onClose(true);
    };

    return (
        <div >
            <form onSubmit={handleSubmit} enctype='multipart/form-data' id="upload-form">
                <div>
                    <label for="name">Image Title:</label>
                    <input type="text" id="title" placeholder="Title Name"
                        name="title" onChange={changeTitle} required className="formInput" />
                </div>
                <div className="descFormEntry">
                    <label for="desc" className="formLabel">Image Description:</label>
                    <textarea id="desc" name="desc" rows="2"
                        placeholder="Description" onChange={changeDesc} required>
                    </textarea>
                </div>
                <div className="imgUploadButton">
                    <label for="image" className="uploadButton">Upload:</label>
                    <input type="file" id="image"
                        name="image" onChange={handleChange} required />
                </div>
                <div className={"formButton"}>
                    {!isLoading && <Button type="submit" variant="contained" onClick={handleSubmit}>
                        Submit
                        </Button>}

                    {isLoading && <Button type="submit" variant="contained" disabled>
                        <i class="fas fa-spinner fa-spin"></i>Uploading
                        </Button>}
                </div>
            </form>
        </div>
    )
}

export default Form;
