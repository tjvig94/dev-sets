import React from "react";
import { Button } from "@material-ui/core";
import "./form.css"

function Form() {

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        fetch('/api/post', {
            body: formData,
            method: 'post',
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },

        }
        )
    }


    return (
        <div >
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="userFormEntry">
                    <label for="name" className="formLabel">User:</label>
                    <input type="text" id="user" placeholder="UserName"
                        name="user" required className="formInput" />
                </div>
                <div className="nameFormEntry">
                    <label for="name" className="formLabel">Image Title:</label>
                    <input type="text" id="title" placeholder="Title Name"
                        name="title" required className="formInput" />
                </div>
                <div className="descFormEntry">
                    <label for="desc" className="formLabel">Image Description:</label>
                    <textarea id="desc" name="desc" rows="2"
                        placeholder="Description" className="formInput" required>
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