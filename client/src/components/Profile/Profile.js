import React,{useEffect,useState} from 'react'
//import {UserContext} from '../../App'
import firebase from 'firebase';
import { CardHeader, colors, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ContentCard from "../homePage/card/card.js";
import { Container } from "@material-ui/core";
import API from '../../utils/API';
//for teh form dialog for getting github info
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//dark mode???
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';


//can use mongodb to do user auth 
//need to associate user to mongodb data images
const Profile  = () => {
    const [mypics,setPics] = useState("")
    const [image,setImage] = useState("")
    const [cardArray, setCardArray] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    function handleSubmit(e){
      e.preventDefault();
      //form data constructor
      const githubAddress = new FormData(e.target)//gethubAddress is the entire form data object use molter to pick it apart and get the address of github
      const githubName = githubAddress.get('GitHubAddress')
      //maybe submnit a post req 
      //form data object is designed to not have to extract out 
      window.localStorage.setItem('github', githubName)
    }
    //dark mode
    //only change if the state changes  
    //lifiting the state
      const [darkState, setDarkState] = useState(JSON.parse(window.localStorage.getItem('mode')));
      const palletType = darkState ? "dark" : "light";
      const darkTheme = createMuiTheme({
        palette: {
          type: palletType,
        }
      });      
      const handleThemeChange = () => {
       setDarkState(!darkState);
       window.localStorage.setItem('mode', !darkState);
      };
    //get ONLY the current firebase users posts on the page 
    useEffect(() => {
      API.getPosts().then(res => {
        console.log('res');
        console.log(res);
        const sortedCards = sortByUser(res.data);
        setCardArray(sortedCards);
      });
    }, []);
    //cmon use map or soemthing struggled a bit with this but it works
    function sortByUser(cardArray) {
      let card = [];
      for (let i = 0 ; i < cardArray.length; i++){
        if (cardArray[i].name === user.displayName){
          card.push(cardArray[i]);
        }
      }
      return card;
    };
    //const { user } = useContext(UserContext);
    let user = firebase.auth().currentUser;
    //profile card css
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,   
          margin: '10px',       
        },
        media: {
          height: 140,
        },
      });
    const classes = useStyles();
    //let user select a jpeg or gif to make their profile image and store in firebase for now
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
    }
      return (
        <div class='box'>
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
                  <td onClick={()=> window.open(window.localStorage.getItem('github'), "_blank")}> GitHub </td>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <input type="file" id="propic" onChange={(e)=>updatePhoto(e.target.files[0])} hidden/>
              <label for ="propic">Change Pic</label>
              <Button color="primary">
              </Button>
              {/*dark or light mode*/}
              <ThemeProvider theme={darkTheme}>
                <div> Dark? </div>
                <Switch checked={darkState} onChange={e => handleThemeChange(e.target.value)} /> 
                <CssBaseline/>
              </ThemeProvider>      
              <div>
                <Button variant="text" color="primary" onClick={handleClickOpen}>
                  GitHub
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add Link to your GitHub account</DialogTitle>
                  <form onSubmit={handleSubmit}>  
                    <DialogContent>
                      <DialogContentText>
                        Please copy the link to your GitHub profile page and click Save GitHub link.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="GitHubLink"
                        type="url"
                        name='GitHubAddress'
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button type='submit' onClick={handleClose} color="primary">
                        Save GitHub link
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </div>
            </CardActions>
          </Card>
          <div>
            <Container maxWidth="lg" className="homeContent">
                {cardArray.map(post => (
                    <ContentCard post={post} key={post.id} />
                ))}
            </Container>
          </div>
        </div>
      );
    }
export default Profile
