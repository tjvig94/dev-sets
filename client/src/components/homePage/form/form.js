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
<<<<<<< HEAD

        }
        )
=======
   
        })
>>>>>>> 1accb606742e081e5741cd44a7e71bc1e2205d01
    }


    return (
        <div >
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
<<<<<<< HEAD
                <div className="userFormEntry">
                    <label for="name" className="formLabel">User:</label>
                    <input type="text" id="user" placeholder="UserName"
                        name="user" required className="formInput" />
                </div>
                <div className="nameFormEntry">
                    <label for="name" className="formLabel">Image Title:</label>
=======
                <div>
                    <label for="name">Image Title:</label>
>>>>>>> 1accb606742e081e5741cd44a7e71bc1e2205d01
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