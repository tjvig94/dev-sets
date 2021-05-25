<<<<<<< HEAD
import React,{useEffect,useState} from 'react'
//import {UserContext} from '../../App'
import firebase from 'firebase';
=======
import React, { useEffect, useState, useContext} from 'react'
import { UserContext } from '../../contexts/UserContext';
>>>>>>> 75baeec219d4714c015d3bc06972d53f80831c5e

const Profile  = () => {
    const [mypics,setPics] = useState("")
    const [image,setImage] = useState("")
    const { user } = useContext(UserContext);
    
    useEffect(()=>{
       fetch('/api/profile/profilePic',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")//put in session storage for closing tab and throwing them out.
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log('result');           ;
           console.log(result);
           setPics(result.profilePic)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("cloud_name","cnq")       
           fetch('/updatepic',{
               method:"post",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:data
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
             //  localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
             //  dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
        .catch(err=>{
            console.log(err)
        })
       }
    }, [image])
    const updatePhoto = (file)=>{
        
        console.log('file')
        console.log(file)
        // Get current username
        var user = firebase.auth().currentUser;

        // Create a Storage Ref w/ username
        var storageRef = firebase.storage().ref('profilepics/' + file.name);//user + '/profilepics/' + file.name

        // Create the file metadata
        var metadata = {
        contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('profilepics/' + file.name).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            //setImage(file);
            setPics(downloadURL);
            });
        }
        );

        // setImage(file)
        
       // setImage(file)
    }
   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={mypics}alt="profile"
                   />
                 
               </div>
               <div>
                  
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics} posts</h6>
 
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 white darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />//
            </div>
            {/* <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div> */}
            </div>
            </div>      
           <div className="gallery">
               {
                //    mypics.map(item=>{
                //        return(
                //         <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                //        )
                //    })
               }

           
           </div>
       </div>
   )
}


export default Profile