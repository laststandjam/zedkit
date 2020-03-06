import React, {useState, useEffect} from "react";
import Firebase from "../../resources/FireBase/firebase"
import {Link, Red} from 'react-router-dom'
import {useSession} from "../../App"
import {CardDeck, Card,} from 'react-bootstrap'
import ItemsCarousel from 'react-items-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css'


const User =()=>{
const [activeItemIndex, setActiveItemIndex] = useState(0);
const chevronWidth = 40;
 const userId= useSession().uid
 const userRef = Firebase.database.collection("users").doc(userId);
 const ticketsRef = Firebase.database.collection("tickets")
 
 const [inPlayTickets, setinPlayTickets] = useState([])
 const [tickets, setTickets] = useState([])
 const [closedTickets, setClosedTickets] = useState([])
 const [user, setUser]=useState([])
console.log(inPlayTickets)
console.log(closedTickets)
useEffect(() => {
  fetchTickets()
  fetchUser()
}, [])
const fetchUser = async () => {
  await userRef.get().then(function(doc) {
    if (doc.exists) {
      setUser({ ...doc.data() });
      return;
    } else {
      console.log("No such document!");
    }
  });
};

const fetchTickets = async () => {
  try {
    const ticketsArr = []
    const querySnapshot = await ticketsRef.where("playerIds","array-contains", userId).get()
    querySnapshot.forEach(doc => {
    ticketsArr.push({...doc.data(), id: doc.id})
    })
    setTickets(ticketsArr)
} catch (error) {
    console.log(error)
  }
}
  
const sortTickets=()=>{
  console.log("sort ticktes hit")
    let setteledTickets=[]
    let openTickets= []
    for(let i = 0; i<tickets.length; i++){
      console.log(tickets[i]) 
      console.log(tickets[i].setteled)
    if(tickets[i].setteled || tickets.disputed){
      setteledTickets.push(tickets[i])
    }else{
      openTickets.push(tickets[i])
    }
    console.log("open tickets", openTickets)
    console.log("closed tickets", setteledTickets)
    setClosedTickets([...closedTickets, ...setteledTickets ])
    setinPlayTickets([...inPlayTickets, ...openTickets])
    console.log("after open", inPlayTickets)
    console.log("after closed", closedTickets )
    }}
useEffect(() => {
  sortTickets()
}, [tickets])

return(
  <div>
    <header>
<h1>Hello {user.userName} your Zed balance is at {user.balance}</h1>

<pr> </pr>
    </header>
    <ItemsCarousel 
     infiniteLoop={true}
     requestToChangeActive={setActiveItemIndex}
     activeItemIndex={activeItemIndex}
     numberOfCards={3}
     gutter={30}
     leftChevron={<button>{'<'}</button>}
     rightChevron={<button>{'>'}</button>}
     outsideChevron={false}
     chevronWidth={chevronWidth}>
      {inPlayTickets.map((t,i)=>(
        <Card classname="cards" key={i}><Card.Title style={{opacity:"01"}}>{t.title}</Card.Title><Card.Body>{t.wager}<p>{t.description}</p><p>{t.author}</p></Card.Body><Card.Footer><button><Link to={`/tickets/${t.id}`} >Play Ticket</Link></button></Card.Footer></Card>
          ))}
           </ItemsCarousel>
           <div classname="scroll" style={{"padding":"0 60px","maxWidth":1000,"margin":"0 auto"}}>
             <ul>
      {closedTickets.map((c,d)=>(
        
        <li key={d}>
<Link to={`/tickets/${c.id}`}>{c.title}</Link>
          </li>))}
           </ul>
           </div> 
           </div>   
)}

export default User;