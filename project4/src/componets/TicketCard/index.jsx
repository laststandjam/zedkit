import React, { useState, useEffect } from "react";
import Firebase from "../../resources/FireBase/firebase";
import firebase from "firebase";
import {useParams} from 'react-router-dom'


const TicketCard = () => {
  const [user, setUser] = useState({});
  const [ticket, setTicket] = useState({});
   const params = useParams()
   const userId = Firebase.getUser().uid;
  const userRef = Firebase.database.collection("users").doc(userId);
  const bookRef = Firebase.database.collection("the book").doc("balance");
  const ticketRef = Firebase.database.collection('tickets').doc(params.id)
  console.log(ticketRef)
 
  useEffect(() => {
    console.log(params.id, 'this is params id')

    async function getTicket() {
      try {
        const ticket = await ticketRef.onSnapshot(function(doc) {
          console.log("Current data: ", doc.data())
          var data = doc.data();
          setTicket({...data})
          console.log(ticket)
      });
        
        console.log(ticket, 'this is ticket after')
  
      } catch (error) {
        console.log(error)
      }
      return ticketRef
    }
    getTicket()},[params.id])
    
    function refreshPage() {
      window.location.reload(false);
    }
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
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  const ticketChecker = async () => {
    console.log("checkerRunning")
    if (isEmpty(ticket)) {
      return;
    }
    if (
      (ticket.winner && ticket.winner.length === 2) ||
      (ticket.loser && ticket.loser.length === 2)
    ) {
      console.log("dispute hit")
      await ticketRef.set(
        {
          disputed: true
        },
        {
          merge: true
        })
      
    }if(ticket.setteled){
      console.log('this ticket has already been setteled')
    } else if (
      ticket&&
      ticket.winner &&
      ticket.winner.length === 1 &&
      ticket.loser &&
      ticket.loser.length === 1
    ) {console.log("ticket settled")
      await Firebase.database
        .collection("users")
        .doc(ticket.winnerId[0])
        .update({
          balance: firebase.firestore.FieldValue.increment(
            +ticket.wager * 2 * 0.99
          )
        });
      await bookRef.update({
        amount: firebase.firestore.FieldValue.increment(
          -ticket.wager * 2 * 0.99
        )
      });
      await ticketRef.set(
        {
          setteled: true
        },
        {
          merge: true
        }
      );
    } 
  };
  const buyTicket = async () => {
    try {
      await userRef.update({
        balance: firebase.firestore.FieldValue.increment(-ticket.wager)
      });
      await bookRef.update({
        amount: firebase.firestore.FieldValue.increment(+ticket.wager)
      });
    
      ticketRef.set(
        {
          open: false,
          playerIds: [ticket.authorId, userId],
          playerUsernames: [ticket.author, user.userName]
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const claimWin = async () => {;
    await ticketRef.update({
      winner: firebase.firestore.FieldValue.arrayUnion(user.userName),
      winnerId: firebase.firestore.FieldValue.arrayUnion(userId)
    });
    ticketChecker();
  };
  const forfeit = async () => {
    await ticketRef.update({
      loser: firebase.firestore.FieldValue.arrayUnion(user.userName),
      loserId: firebase.firestore.FieldValue.arrayUnion(userId)
    });
    ticketChecker();
  };
  useEffect(() => {
    
    fetchUser();
  }, []);
  useEffect(() => {
    
    
  }, [ticket]);
  
  if (ticket && ticket.setteled){
    return(<div>
         <h1>{ticket.title}</h1>
<h2>Congrats {ticket.winner[0]}!!! {(+ticket.wager*2)*.99} Zed have been deposisted in your account</h2>
        </div>
    )
  }else if(ticket && ticket.disputed){
    return(
    <div>
      <h1>{ticket.tile}</h1>
  <h2>This ticket has come into dispute a mark has been added agaisnt both profiles and you haven given the house {ticket.wager*2} Zed </h2>
    </div>)
  }else if(ticket&&ticket.open){
    return(
      <div>
         <h1>{ticket.title}</h1>
         <h2>{ticket.description}</h2>
        <h3>Buy ticket for {ticket.wager} Zed</h3>
        <p>Written by {ticket.author}</p>
        <button onClick={(()=>{
          buyTicket()
          setTimeout(() => {
            refreshPage()
          }, 1000);
        }) }>Buy Ticket</button>
      </div>
    )}
    if(ticket&&!ticket.open){ console.log( ticket)
      return(<div>
          <h1>{ticket.title}</h1>
        <h2>{ticket.description}</h2>
        <h3>Playing this ticket are</h3>
        <h4>{ticket.playerUsernames&&ticket.playerUsernames[1]} Challenging {ticket.author}</h4>
      <p>If you have met the conditions or your openent has failed too claim your Zed<button onClick={(()=>{
          claimWin()
        }) }>Claim Win</button></p>
      <p>Vice-versa<button onClick={(()=>{
          forfeit()
        }) }> Forfeit Ticket </button></p>
        </div>
      )
    }else{
      console.log(ticket)
      return(
        
      <div><p>loading</p></div>)
    }
  }
  
export default TicketCard;
