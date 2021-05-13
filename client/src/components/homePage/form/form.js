import React from "react"
import { Button } from "@material-ui/core"


function Form() {

    return (
        <div>
            <form action="/" method="POST" enctype="multipart/form-data">
                <div>
                    <label for="name">Image Title:</label>
                    <input type="text" id="name" placeholder="Name"
                        value="" name="name" required />
                </div>
                <div>
                    <label for="desc">Image Description:</label>
                    <textarea id="desc" name="pesc" value="" rows="2"
                        placeholder="Description" required>
                    </textarea>
                </div>
                <div>
                    <label for="file-upload" className="uploadButton">Upload Image:</label>
                    <input type="file" id="image"
                        name="image" value="" require />
                </div>
                <div>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Form;