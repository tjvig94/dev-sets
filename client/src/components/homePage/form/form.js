import React from "react";
import { Button } from "@material-ui/core";


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
        <div>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
                    <label for="name">User:</label>
                    <input type="text" id="user" placeholder="UserName"
                        name="user" required />
                </div>
                <div>
                    <label for="name">Image Title:</label>
                    <input type="text" id="title" placeholder="Title Name"
                        name="title" required />
                </div>
                <div>
                    <label for="desc">Image Description:</label>
                    <textarea id="desc" name="desc" rows="2"
                        placeholder="Description" required>
                    </textarea>
                </div>
                <div>
                    <label for="image" className="uploadButton">Upload Image:</label>
                    <input type="file" id="image"
                        name="image"  required />
                </div>
                <div>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Form;