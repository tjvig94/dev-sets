import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./form.css"

function Form({ user }) {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = user.uid;
        const formData = new FormData(event.target)
        formData.append('user', userId);
        await fetch('/api/post', {
            body: formData,
            method: 'post',
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
   
        })
    }


    return (
        <div >
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                    <label for="name">Image Title:</label>
                    <input type="text" id="title" placeholder="Title Name"
                        name="title" required className="formInput" />
                </div>
                <div className="descFormEntry">
                    <label for="desc" className="formLabel">Image Description:</label>
                    <textarea id="desc" name="desc" rows="2"
                        placeholder="Description" required>
                    </textarea>
                </div>
                <div className="imgUploadButton">
                    <label for="image" className="uploadButton">Upload Image:</label>
                    <input type="file" id="image"
                        name="image" required />
                </div>
                <div className="formButton">
                    <Button type="submit" variant="contained" >Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Form;