import firebase from 'firebase';
const firebaseConfig = {
   apiKey: "AIzaSyB-ADBkOOyyaONg9YUB8JFkAvHYMyw5HEA",
   authDomain: "devsets-d95a1.firebaseapp.com",
   projectId: "devsets-d95a1",
   storageBucket: "devsets-d95a1.appspot.com",
   messagingSenderId: "182571848559",
   appId: "1:182571848559:web:b85f2ff218ef78da788e9a",
   measurementId: "G-TCY16023V2"
 };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

console.log('provider');
console.log(provider);
console.log('auth');
console.log(auth);

export { auth, provider };
export default storage;