import React, { useState, useEffect } from "react";
import Firebase from "../../resources/FireBase/firebase";
import { useSession } from "../../App";
import firebase from "firebase";

const CreateTicket = () => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [wager, setWager] = useState(0);
  const [description, setDescription] = useState("");
  const userId = useSession().uid;
  const userRef = Firebase.database.collection("users").doc(userId);
  const bookRef = Firebase.database.collection("the book").doc("balance");

  const fetchUser = async () => {
    await userRef.get().then(function(doc) {
      if (doc.exists) {
        setUser({ ...doc.data() });
        return;
      } else {
      }
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await Firebase.database
        .collection("tickets")
        .doc()
        .set({
          title: title,
          wager: wager,
          description: description,
          winner: [],
          winnerId: [],
          loser: [],
          open: true,
          author: user.userName,
          authorId: userId
        });
      userRef.update({
        balance: firebase.firestore.FieldValue.increment(-wager)
      });
      bookRef.update({
        amount: firebase.firestore.FieldValue.increment(+wager)
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    
  };
  const setter = set => e => {
    const { target } = e;
    const { value } = target;
    set(value);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
      onSubmit={handleSubmit}
    >
      <input
        onChange={setter(setTitle)}
        type="text"
        name="title"
        placeholder="Title"
      />
      <input
        onChange={setter(setDescription)}
        type="text"
        name="description"
        placeholder="description"
      />
      <input
        onChange={setter(setWager)}
        type="number"
        name="amount"
        placeholder="0"
      />

      <button type="submit">Submit</button>
      
    </form>
    </div>
  );
};

export default CreateTicket;
