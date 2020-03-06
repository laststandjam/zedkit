import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import {Link} from "react-router-dom"
import "./style.css"

const Home =()=>{
  const [topUsers, setTopUsers] = useState([])
  const [topTickets, setTopTickets]= useState([])
  const ticketsRef = Firebase.database.collection("tickets").orderBy("wager",'desc').limit(5)
  const userRef = Firebase.database.collection("users").orderBy("balance", 'desc').limit(5)
  const ticketsArr=[]
  const userArr=[]
 
  
  
  
  const sort = (arr,ref,func)=>{
    ref.get().then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        console.log(doc.id, ' => ', doc.data())
          arr.push({...doc.data()})
      })
      func(arr)
    })
  }
  useEffect(() => {
    sort(userArr, userRef, setTopUsers)
    sort(ticketsArr, ticketsRef, setTopTickets)
    return () => {
      
    };
  }, [])
  return(
    <div>
   <h1>Welcom to Zed's Market</h1>
   <br></br>
   At the Market we buy Tickets with Zed in hopes <br></br> of getting more Zed create tickets for sports politics or just farting around with Friends Get enough Zed and get in the Zed Whale Board!! Get started by <Link exact to='/login'>Loggin IN</Link>
   <p></p><p></p>
   <h3>The Zed Whales</h3>
   <ol className="whales">
      {topUsers.map((c,d)=>(
        
        
        <li key={d}>
{c.userName} Is a Zed Whale with {c.balance} Zed
          </li>))}
          
   </ol>
   <h3></h3>
  </div>
)
}


export default Home;