import { useState, useEffect } from "react";
import "./HomePage.css";
import { Card } from 'flowbite-react';
import NewChannel from "../modals/NewChannel";
import useFirebaseImage  from "./utils/useFirebaseImage"
import { auth, db } from "../../FirebaseConfig";
import Dashboard from "./Dashboard";
import { doc, onSnapshot } from "firebase/firestore";

function HomePage(){

    const backgroundImageUrl = useFirebaseImage('bg-images/chatting.png');













    return (
        <>
<div className="Card" style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
    <Card className="Card-1"> 
        <div>
        Want to make a new channel? Chat with your coworkers or friends.
        </div>
        <NewChannel  />
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="-0.5 -0.5 24 24" ><path fill="currentColor" d="m21.289.98l.59.59c.813.814.69 2.257-.277 3.223L9.435 16.96l-3.942 1.442c-.495.182-.977-.054-1.075-.525a.928.928 0 0 1 .045-.51l1.47-3.976L18.066 1.257c.967-.966 2.41-1.09 3.223-.276zM8.904 2.19a1 1 0 1 1 0 2h-4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a1 1 0 0 1 2 0v4a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4v-12a4 4 0 0 1 4-4z"></path></svg> */}
    </Card> 
    <Card className="Card-2">
    <div>
       <p> Want to add a coworker or friend? Use Phone number, email, or their name to find them.</p>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><g fill="currentColor"><path d="M12.5 16a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0a3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4"></path><path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"></path></g></svg>
     </Card> 
     <div className="Logo bg-amber-500 position-relative top-0 end-0" style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        
        }} >
        <svg
              
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="4em" height="4em"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg></div>
</div>
      </>      
    );
}


export default HomePage