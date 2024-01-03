import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";

const firebaseConfig = ({
  apiKey: "AIzaSyBDqimXQigkdBXL_ZfbtvXPN_e47EIKdgk",
  authDomain: "splitwise-app-dde75.firebaseapp.com",
  projectId: "splitwise-app-dde75",
  storageBucket: "splitwise-app-dde75.appspot.com",
  messagingSenderId: "603756434886",
  appId: "1:603756434886:web:dfc40415247f53aa11cec7"
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