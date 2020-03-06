import React, { useState, useEffect } from 'react'
import Firebase from '../../resources/FireBase/firebase'
import TicketCard from '../../componets/TicketCard'





const TicketShow =({...props})=>{
const [ticket, setTicket] = useState({})
const ticketId=props.match.params.id
const ticketRef = Firebase.database.collection('tickets').doc(ticketId)
let user={}


useEffect(() => {
  ticketRef.get().then(function(doc) {
  if (doc.exists) { 
    return setTicket({...doc.data()})


      
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


return 
},[]);


return(
   <div>
     <TicketCard ticket={ticket} ticketId={ticketId}/>
  </div>
  )
}


export default TicketShow
