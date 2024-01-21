import React, { useState } from 'react'
import logo2 from "../images/logo2.png"
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { useSelector } from 'react-redux'

export const RecentActivity = () => {

    const userEmail = useSelector((state) => state.useremail.email);

        const [error, setError] = useState("");
        const navigate = useNavigate();

        const {logout} = useAuth();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            navigate("/")
        } catch {setError("Failed to log out");}}
  

        const [totalOwedToMe, setTotalOwedToMe] = useState(0);
        const [totalIOwe, setTotalIOwe] = useState(0);
        const [totalBalance, setTotalBalance] = useState(0);
        const owedFromEmail = [];
        const owedFromAmount = [];

    const iterateExpenses=async()=> {
    
        const expensesCollection =  db.collection("users").doc(userEmail).collection("expenses");
        let accumulatedTotalOwed = 0;
        let accumulatedTotalIOwe = 0;  
        
        await expensesCollection.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const amountOwedToMeArray = data.amountOwedToMe;
                    accumulatedTotalIOwe += parseFloat(data.amountYouOwe);
                    if (accumulatedTotalIOwe > 0) {
                        setTotalIOwe(accumulatedTotalIOwe);
                    }

                    if (Array.isArray(amountOwedToMeArray)) {
                        amountOwedToMeArray.forEach(entry => {
                          if (typeof entry.amount === 'number' || !isNaN(entry.amount)) {
                            accumulatedTotalOwed += parseFloat(entry.amount);
                          }
                    });}});  
                        setTotalOwedToMe(accumulatedTotalOwed);
                        console.log("1 await")
                    })
            .catch(error => {console.error('Error getting documents:', error);});
            console.log("await1")

            
        await db.collection("users").get()
        .then(parentQuerySnapshot => {
            parentQuerySnapshot.forEach(async(parentDoc) => {
            // const parentData = parentDoc.data();
            const subcollectionRef = parentDoc.ref.collection('expenses'); // Replace 'subcollectionName' with your subcollection name
            console.log("2 await")

            // Retrieve documents from the subcollection
            await subcollectionRef.get()
                .then(subcollectionQuerySnapshot => {
                subcollectionQuerySnapshot.forEach(subDoc => {
                    const subData = subDoc.data();
                    if (subData.owedTo === userEmail) {
                        owedFromEmail.push(parentDoc.id)
                        // console.log('Parent Document ID:', parentDoc.id);
                        owedFromAmount.push(subData.amountYouOwe)
                        // console.log(subData.amountYouOwe);
                        // console.log('Sub Document Data:', subData);
                    }
                    console.log("3 await")
                });
                })
                .catch(subError => {
                console.error('Error retrieving subcollection documents:', subError);
                });
                console.log("await2")
            });
            console.log("await3")
            console.log(totalOwedToMe)
            console.log(totalIOwe)
            setTotalBalance(totalOwedToMe - totalIOwe);
                  
        })
        .catch(parentError => {
            console.error('Error retrieving parent collection documents:', parentError);
        });
        console.log("4 await")
    }

    return (
        <>
    <nav className="NavbarContainer2">
        <header className="Navbar2">
            <div className="LeftSection2">
                <Link to="/dashboard">
                <img className="Logo2" href="/" src={logo2} alt="Splitwise Logo"></img>
                </Link>
            </div >
            <div className="RightSection2">
                <Link to="/" className="LogoutButton" onCLick={() => handleLogout}> Logout </Link>
            </div>
        </header>
    </nav>
    

    <div className="DashboardContainer">
        
        <div className="DC-Section1">
            <Link to={'/dashboard'} className="dashboardButton" onClick={() => {/*setTotalOwedToMe(0); setTotalIOwe(0); setTotalBalance(0)*/} }>Dashboard</Link>
            <Link to={'/recentactivity'}className="recentActivityButton" onClick={() => {iterateExpenses();}}>Recent Activity</Link> 
        </div>
        
    <div className="DC-Section2">
    

    <div className="recentActivityContainer">
        <div className="userBalancesContainer">
            <div className="uBC-Item">total balance <p>{totalBalance}</p></div>
            <div className="uBC-Item">you owe <p>{totalIOwe}</p></div>
            <div className="uBC-Item"> you are owed <p>{totalOwedToMe}</p></div>
        </div>
                    
        <div className="userBalancesContainer2">
            <div className="uBC2-Item">YOU OWE
            </div>

            <div className="uBC2-Item">YOU ARE OWED
                {owedFromEmail.map((value, index) => {
                    try {
                        return <h1 key={index}>Value at Index {index}: {value}</h1>;
                    } catch (error) {
                    console.error("Error rendering <h1> tag:", error);
                    return null; // Return null or a placeholder in case of an error
                    }
                })}
            </div>
        </div>

    </div>
    
    </div>
    </div>
    </>
  )
}
