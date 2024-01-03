import React, { useState, useRef, useEffect } from 'react'
import logo2 from "../images/logo2.png"
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../firebase'
import { useSelector } from 'react-redux'

const emailArr = [];

export const Dashboard = () => {

    const [cont2Display, setCont2Display] = useState("");
    const navigate = useNavigate();

    const descriptionRef = useRef();
    const totalAmountRef = useRef();
    const dateRef = useRef();
    const currentUserAmountRef = useRef();

    
        const [numFriends, setNumFriends] = useState(1);

    const addFriend = () => {setNumFriends(numFriends + 1);};

    const removeFriend = () => {
        if (numFriends > 0) {
            emailArr.splice(emailArr.length - 1, 1);
            yourPartAmountArr.splice(yourPartAmountArr.length - 1, 1);
            amountPaidArr.splice(amountPaidArr.length - 1, 1);
            amountOthersOweToCurrentUser.splice(amountOthersOweToCurrentUser.length - 1, 1);
            setNumFriends(numFriends - 1);
        }};
  

        const {logout} = useAuth();

    async function handleLogout() {
        try {
            await logout();
            navigate("/")
        } catch {alert("Failed to log out")}}


        
        const yourPartAmountArr = [];
        const amountPaidArr = [];
        const amountOthersOweToCurrentUser = [];
        const userEmail = useSelector((state) => state.useremail.email);

    const handleSubmit = (e) => {
        try {
            e.preventDefault();

            let n = parseFloat(currentUserAmountRef.current.value);    
            let n2 = parseFloat(totalAmountRef.current.value);
            for (let i in yourPartAmountArr) {
                try {
                    if (yourPartAmountArr[i] === 0) {
                    console.log(yourPartAmountArr[i]);}
                n += parseFloat(yourPartAmountArr[i]);
                    } catch {alert("Any Person's share in total bill cannot be zero")}

            }
            if (n !== n2) {
                n = 0;   
                throw new Error();
            }
            
            for (let i = 0; i < emailArr.length; i++) {
                if (emailArr[i]) {                
                    db.collection("users").doc(emailArr[i]).collection("expenses")
                        .add({
                            description: descriptionRef.current.value,
                            totalAmount: totalAmountRef.current.value,
                            date: dateRef.current.value,
                            yourPartOfExpense: yourPartAmountArr[i],
                            amountYouPaid: amountPaidArr[i],
                            amountYouOwe:  amountOthersOweToCurrentUser[i],
                            owedTo: userEmail,
                        })
                        .then(() => {console.log(`expenses added to users`);})
                        .catch((error) => {console.error('Error creating document: ', error);})           
                }}
            
            db.collection("users").doc(userEmail).collection("expenses")
            .add ({
                description: descriptionRef.current.value,
                totalAmount: totalAmountRef.current.value,
                date: dateRef.current.value,
                amountToPay: currentUserAmountRef.current.value,
                owedToMeEmails: emailArr,
                owedToMeAmounts: amountOthersOweToCurrentUser,
            })
            .then(() => {console.log(`expense added for current user.`);})
            .catch((error) => {console.error('Error creating document: ', error);});
        
            // reset form 
            descriptionRef.current.value = '';
            totalAmountRef.current.value = '';
            currentUserAmountRef.current.value = '';
            dateRef.current.value = '';
            emailArr.splice(0, emailArr.length);
            yourPartAmountArr.splice(0, yourPartAmountArr.length);
            amountPaidArr.splice(0, amountPaidArr.length);
            amountOthersOweToCurrentUser.splice(0, amountOthersOweToCurrentUser.length);
            for (let i = 0; i < numFriends + 1; i++) {removeFriend();}

    } catch (error) {
            // Code to handle the error
            alert("Total Bill Amount not equal to total amount to be paid");
          }
    }


        const [totalOwedToMe, setTotalOwedToMe] = useState("");
        const [totalIOwe, setTotalIOwe] = useState("");
        const [totalBalance, setTotalBalance] = useState("");

        const [owedFromEmail, setOwedFromEmail] = useState("");
        const [owedFromAmount, setOwedFromAmount] = useState("");
        
        const [owedToEmail, setOwedToEmail] = useState("");
        const [owedToAmount, setOwedToAmount] = useState("");

    const balances = async() => {

        const expensesCollection = db.collection("users").doc(userEmail).collection("expenses");
        let newOwedFromAmount = [];
        let newOwedFromEmail = [];
        let newOwedToAmount = [];
        let newOwedToEmail = [];

        await expensesCollection.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.owedToMeAmounts && data.owedToMeEmails) {
                        console.log(typeof(data.owedToMeAmounts), "i 1", data.owedToMeAmounts);
                        
                    // newOwedFromAmount = data.owedToMeAmounts;
                    // newOwedFromEmail = data.owedToMeEmails;

                    
                    newOwedFromAmount = newOwedFromAmount.concat(data.owedToMeAmounts);
                    newOwedFromEmail = newOwedFromEmail.concat(data.owedToMeEmails);
                    };

                    if (data.yourPartOfExpense && data.owedTo) {
                        console.log(typeof(data.amountYouOwe), "i 1", data.amountYouOwe);
                   
                    // newOwedToAmount = data.amountYouOwe;
                    // newOwedToEmail = data.owedTo;

                    newOwedToAmount = newOwedToAmount.concat(data.amountYouOwe);
                    newOwedToEmail = newOwedToEmail.concat(data.owedTo);
                    
                    }
                });
            })
            .catch(error => {
                console.error('Error getting documents:', error);
            });

        setOwedFromAmount(newOwedFromAmount);
        setOwedFromEmail(newOwedFromEmail);
        let sum = 0;
        for (let i = 0; i < owedFromAmount.length; i++ ) {
            sum += Number(owedFromAmount[i]);
        }
        setTotalOwedToMe(sum);
        sum = 0;
 
        setOwedToAmount(newOwedToAmount);
        setOwedToEmail(newOwedToEmail);
        for (let i = 0; i < owedToAmount.length; i++ ) {
            sum += Number(owedToAmount[i]);
        }
        setTotalIOwe(sum);
        sum = 0;
        setTotalBalance(Number(totalOwedToMe) - Number(totalIOwe))

      
        console.log(typeof(owedToAmount), typeof(owedToEmail));
        console.log(owedToAmount, owedToEmail);

        
    }

    useEffect(() => {
        balances();
    }, [cont2Display, totalBalance, totalOwedToMe, totalIOwe]);

    return (
    <>
    <nav className="NavbarContainer2">
        <header className="Navbar2">
            <div className="LeftSection2">
                <Link to="/dashboard">
                <img className="Logo2" href="/" src={logo2} alt="pic of company logo"/>
                </Link>
            </div >
            <div className="RightSection2">
                <Link to="/" className="LogoutButton" onCLick={() => handleLogout}> Logout </Link>
            </div>
        </header>
    </nav>
    
    <div className="DashboardContainer">
        
        <div className="DC-Section1">
            <button className="dashboardButton" onClick={() => {setCont2Display("dashboard");} }>Dashboard</button>
            <button to={'/recentactivity'}className="recentActivityButton" onClick={() => {setCont2Display("recentActivity");}}>Recent Activity</button> 
        </div>
        
        <div className="DC-Section2">
            
            {cont2Display === "dashboard" ? (
            <>
            <h1>Add an Expense</h1>
            <form className="expenseForm" onSubmit={handleSubmit}>
                <label>Description: &nbsp;
                    <input
                    type="text"
                    placeholder="Enter a description"
                    id="description"
                    name="description"
                    ref={descriptionRef}
                    required
                /></label>

                <label>Total Bill: &nbsp;<input
                    type="number"
                    placeholder="Total Bill Amount: 0.00"
                    id="totalAmount"
                    name="totalAmount"
                    ref={totalAmountRef}
                    required
                /></label>

                <label>My Amount: &nbsp;<input
                    type="number"
                    placeholder="Amount I Pay: 0.00"
                    id="currentUserAmount"
                    name="currentUserAmount"
                    ref={currentUserAmountRef}
                    required
                /></label>

                <label>Date of Expense: &nbsp;<input
                    type="date" 
                    name="date"
                     
                    ref={dateRef}
                    required
                    /></label>

                <button className="addButton" type="button" onClick={addFriend}>Add Friend</button>
                <button className="removeButton" type="button" onClick={removeFriend}>Remove Friend</button>
                

                {Array.from({ length: numFriends }).map((_, index) => {
                    amountPaidArr[index] = 0;
                    return (
                    
                    <>
                    <h3 style={{textAlign: 'center'}}>Friend {index + 1}</h3>
                    <div key={index} style={{display: 'flex'}}>
                        <label className="input-items" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}> 
                        Email<input
                            type="email"
                            placeholder={`Email`}
                            className = {`Email`}
                            name={`Email`}
                            onChange={(e) => {
                                emailArr[index] = e.target.value;
                                console.log(emailArr); 

                            }}
                            required
                        /></label>
                        
                        <label className="input-items" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}> 
                        Total To Pay<input
                            type="number"
                            placeholder={`Bill Part`}
                            className = {`Amount`}
                            name={`Amount`}
                            defaultValue={"0"}
                            onChange={(e) => {
                                yourPartAmountArr[index] = e.target.value;
                                amountOthersOweToCurrentUser[index] = Number(yourPartAmountArr[index]) - Number(amountPaidArr[index]);
                                console.log(yourPartAmountArr);
                                console.log(amountOthersOweToCurrentUser, "1");
                            }}
                            required
                        /></label>
                        
                        <label className="input-items" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}> 
                        Pay Immediately<input
                            type="number"
                            placeholder={`Amount`}
                            className = {`Amount`}
                            name={`Amount`}
                            defaultValue={"0"}
                            onChange={(e) => {
                                amountPaidArr[index] = e.target.value;
                                amountOthersOweToCurrentUser[index] = Number(yourPartAmountArr[index]) - Number(amountPaidArr[index]);
                                console.log(amountPaidArr);
                                console.log(amountOthersOweToCurrentUser, "2");
                            }}
                            required
                            /></label>
                    </div>
                    </>
                   );
                })}

                <button type="save" id="submitButton">Submit</button>
            </form>
            </>

            ) : cont2Display === "recentActivity" ? (
                // Content for "recentActivity"
                <div className="recentActivityContainer">
                    <div className="userBalancesContainer">
                        <div className="uBC-Item">total balance 
                            <p style={{ color: totalBalance > 0 ? 'green' : totalBalance < 0 ? 'red' : 'black' }}>
                            {totalBalance}</p>
                        </div>
                        <div className="uBC-Item">you owe <p style={{color: "red"}}>{totalIOwe}</p></div>
                        <div className="uBC-Item"> you are owed <p style={{color: "green"}} >{totalOwedToMe}</p></div>
                    </div>
                    
                    <div className="userBalancesContainer2">
                        <div className="uBC2-Item">
                            <h3>YOU OWE</h3>
                        
                            {owedToEmail && owedToEmail.map((item, index) => (
                                owedToAmount[index] > 0 && (
                                <h3 key={index}>${owedToAmount[index]} to {item}</h3>
                                )
                            ))}

                        </div>

                        <div className="uBC2-Item">
                            <h3>YOU ARE OWED</h3>
                                    
                            {owedFromEmail && owedFromEmail.map((item, index) => (
                                owedFromAmount[index] > 0 && (
                                <h3 key={index}>${owedFromAmount[index]} from {item}</h3>
                                )
                            ))}
                        
                        </div>
                    </div>

                </div>
              ) : (
                // Default: Empty content or some message
                <p>Select an option</p>
            )}

        </div>

    </div>
    </>
  )
}