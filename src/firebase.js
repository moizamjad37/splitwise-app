import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = ({
  apiKey: "AIzaSyBzqkavVz9rTfGdFfC7an5g_owfoEOfEXo",
  authDomain: "splitwise-app-66fd6.firebaseapp.com",
  projectId: "splitwise-app-66fd6",
  storageBucket: "splitwise-app-66fd6.appspot.com",
  messagingSenderId: "136243333293",
  appId: "1:136243333293:web:a588fda782f511d093de24",
  measurementId: "G-QK8ZJ0DX1N"
});

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const db = firebase.firestore(); 
// export const colRef = db.collection("expenses");

// colRef.get()
// .then((Snapshot) => {
//   let expenses = [];
//   Snapshot.docs.forEach((doc) => {
//     expenses.push({...doc.data(), id: doc.id})
//   })
//   console.log(expenses)
// })
// .catch((error) => {
//   console.log("Error getting documents: ", error);
// });

// const addExpensesForm = document.querySelector(".add")
// addExpensesForm.addEventListener("submit", (e) => {
//   e.preventDefault()
//   colRef.get()
//   .add()
// })


    let docID = [];
    db.collection("users").limit(1).get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        docID[0] = doc.id.toString();
        console.log(docID, doc.type)
      }
    })




export default firebaseApp; 