import React,{useEffect,useState} from 'react'
//import {UserContext} from '../../App'

const Profile  = ()=>{
    const [mypics,setPics] = useState("")
   // const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('/api/profile/profilePic',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")//put in session storage for closing tab and throwing them out.
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
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
        setImage(file)
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

           
           </div>
       </div>
   )
}


export default Profile