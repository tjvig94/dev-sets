import React,{useEffect,useState} from 'react'
//import {UserContext} from '../../App'
import firebase from 'firebase';
import { colors, FormHelperText } from '@material-ui/core';



import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Profile  = () => {
    const [mypics,setPics] = useState("")
    const [image,setImage] = useState("")
    //const { user } = useContext(UserContext);
    let user = firebase.auth().currentUser;

    const useStyles = makeStyles({
        root: {
          maxWidth: 345,          
        },
        media: {
          height: 140,
        },
      });
    
    const classes = useStyles();

    useEffect(()=>{
       fetch('/api/profile/profilePic',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")//put in session storage for closing tab and throwing them out.
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log('result');
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
//        var user = firebase.auth().currentUser;

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
            
            user.updateProfile({
                photoURL: downloadURL
              }).then(function() {
                // Update successful.
                setPics(downloadURL);
                console.log('it works');
              }).catch(function(error) {
                // An error happened.
                console.log('error occured');
              });
            });
          }
        );

        // setImage(file)
        
       // setImage(file)
      // export default function MediaCard() {
        //const classes = useStyles();

    }
     
      return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image= {user.photoURL} //"/static/images/cards/contemplative-reptile.jpg"
              title= {user.displayName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user.displayName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Email address for {user.displayName} is {user.email}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <input type="file" id="propic" onChange={(e)=>updatePhoto(e.target.files[0])} hidden/>
            <label for ="propic">Change Pic</label>
            <Button size="small" color="primary">
              
<<<<<<< HEAD
            </Button>
          </CardActions>
        </Card>
      );
    }

export default Profile

=======
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={user.photoURL}alt="profile"
                   />
                 
               </div>
               <div>
                  
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics} posts</h6>
 
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
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
>>>>>>> d0f7e2a9e3406ab4b95a09d2485179eae1887d9d


// return (
//     <div style={{maxWidth:"550px",margin:"0px auto", color:'white'}}>
//         <div style={{
//            margin:"18px 0px",
//             borderBottom:"1px solid grey"
           
//         }}>

      
//         <div style={{
//             display:"flex",
//             justifyContent:"space-around",
           
//         }}>
//             <div>
//                 <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
//                 src={user.photoURL}alt="profile"
//                 />
              
//             </div>
//             <div>
               
//                 <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
//                     <h6>{mypics} posts</h6>

//                 </div>

//             </div>
//         </div>
     
//          <div className="file-field input-field" style={{margin:"10px"}}>
//          <div className="btn #64b5f6 white darken-1">
//              <span>Update profile pic</span>
//              <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />//
//          </div>
//          {/* <div className="file-path-wrapper">
//              <input className="file-path validate" type="text" />
//          </div> */}
//          </div>
//          </div>      
//         <div className="gallery">
//             {
//              //    mypics.map(item=>{
//              //        return(
//              //         <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
//              //        )
//              //    })
//             }

        
//         </div>
//     </div>
// )