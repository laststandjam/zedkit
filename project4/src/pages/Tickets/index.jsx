import React, {useState, useEffect}from "react";
import Firebase from '../../resources/FireBase/firebase';
import { Link } from "react-router-dom";
import {Card, CardDeck, Carousel, Container} from "react-bootstrap"
import "./style.css"

const Tickets =(currentUser)=>{
    const [tickets, setTickets] = useState([])
    const ticketsRef = Firebase.database.collection('tickets')
    console.log(tickets)
    const fetchTickets = async () => {
      try {
        const ticketsArr = []
        const querySnapshot = await ticketsRef.where("open", "==", true ).get()
        console.log(querySnapshot)
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data())
          ticketsArr.push({...doc.data(), id: doc.id})
        })
        setTickets(ticketsArr)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        fetchTickets()
    },[])
return(
  <>
   
<Carousel style={{maxWidth:"50%", display: "block", marginLeft: "auto", marginRight: "auto"}}indicators={false}>
{tickets.map((t,i)=>(<Carousel.Item key={i}>
<Card classname="cards"><Card.Title style={{opacity:"01"}}>{t.title}</Card.Title><Card.Body>{t.wager}<p>{t.description}</p><p>{t.author}</p></Card.Body><Card.Footer><button><Link to={`/tickets/${t.id}`} >Interested??</Link></button></Card.Footer></Card>
  </Carousel.Item>))}
</Carousel>

</>)}
export default Tickets

