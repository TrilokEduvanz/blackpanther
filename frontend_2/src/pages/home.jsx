// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './home.css'; // Import your CSS file for styling (optional)

// function Home() {
//   const [activeTab, setActiveTab] = useState('Home'); // Initial active tab
//   const location = useLocation(); // Get current route for active tab styling

//   const handleTabClick = (tab) => {
//     setActiveTab(tab); // Update active tab state
//   };

//   return (
//     <div className="home-container">
//       <header className="header">
//         <Link to="/" className="logo">
//           {/* Add your company logo image here */}
//           {/* <img src="./logo.png"  alt="company logo"/> */}
//           <img src="./logo.png" alt="company logo" />

//         </Link>
//         <nav className="nav">
//           <ul>
//             <li className={location.pathname === '/' ? 'active' : ''}>
//               <Link to="/" onClick={() => handleTabClick('Home')}>
//                 Home
//               </Link>
//             </li>
//             <li className={location.pathname === '/display' ? 'active' : ''}>
//               {/* <Link to="./nach_presented" onClick={() => handleTabClick('Nach Presented')}> */}
//               <Link to="./display" onClick={() => handleTabClick('Display')}>

//                 Nach Presented
//               </Link>
//             </li>
//             <li className={location.pathname === '/past-nach' ? 'active' : ''}>
//               <Link to="/past-nach" onClick={() => handleTabClick('Past Nach')}>
//                 Past Nach
//               </Link>
//             </li>
//             <li className={location.pathname === '/all-nach' ? 'active' : ''}>
//               <Link to="/nach_presentation" onClick={() => handleTabClick('All Nach')}>
//                 All Nach
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </header>

//       {/* Rest of your home page content goes here */}
//       <div className="content">
//         {/* Display content based on the active tab */}
//         {activeTab === 'Home' && (
//           <div>
//             {/* Home page content */}
//           </div>
//         )}
//         {activeTab === 'Nach Presented' && (
//           <div>
//             {/* Nach Presented content */}
//           </div>
//         )}
//         {/* ... similar logic for other tabs */}
//       </div>
//     </div>
//   );
// }

// export default Home;











// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './home.css'; // Import your CSS file
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PreviousMonth from './prev_month'

// function Home() {
//   const [activeTab, setActiveTab] = useState('Home');
//   const location = useLocation();

//   const [lastMonthNachData, setLastMonthNachData] = useState(null);
//   const [currentMonthNachCount, setCurrentMonthNachCount] = useState(0);

//   useEffect(() => {
//     // Fetch last month's NACH data (replace with your API call)
//     const fetchLastMonthNachData = async () => {
//       const response = await fetch('/api/last-month-nach'); // Replace with your API endpoint
//       const data = await response.json();
//       setLastMonthNachData(data);
//     };

//     // fetchLastMonthNachData();

//     // Fetch current month's NACH count (replace with your API call)
//     const fetchCurrentMonthNachCount = async () => {
//       const response = await fetch('/api/current-month-nach-count'); // Replace with your API endpoint
//       const count = await response.json();
//       setCurrentMonthNachCount(count);
//     };

//     // fetchCurrentMonthNachCount();
//   }, []);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="home-container">
//          <header className="header">
//             {/* Add your company logo image here */}
//               {/* <img src="./logo.png"  alt="company logo"/> */}
//              <Link to="/" className="logo">
//               <img src="./logo.png" alt="company logo" />
    
//   </Link>
//             <nav className="nav">
//              <ul>
//                <li className={location.pathname === '/' ? 'active' : ''}>
//                   <Link to="/" onClick={() => handleTabClick('Home')}>
//                     Home
//                   </Link>
//                 </li>
//                 <li className={location.pathname === '/display' ? 'active' : ''}>
//                   {/* <Link to="./nach_presented" onClick={() => handleTabClick('Nach Presented')}> */}
//                   <Link to="./display" onClick={() => handleTabClick('Display')}>
    
//                     Nach Presented
//                   </Link>
//                 </li>
//                 <li className={location.pathname === '/past-nach' ? 'active' : ''}>
//                   <Link to="/past-nach" onClick={() => handleTabClick('Past Nach')}>
//                     Past Nach
//                  </Link>
//                </li>
//                <li className={location.pathname === '/all-nach' ? 'active' : ''}>
//                  <Link to="/nach_presentation" onClick={() => handleTabClick('All Nach')}>
//                    All Nach
//                  </Link>
//                </li>
//              </ul>
//             </nav>
//          </header>



         
    
//          {/* <Route path="/prev_month" component={PrevMonthComponent} /> */}

//       <div className="nach-summary-container">
//         <h1>LAST MONTH NACH</h1>
//       <li className={location.pathname === '/prev_month' ? 'active' : ''}>
//                   <Link to="/prev_month" onClick={() => handleTabClick('Prev Month')}>
//                     Previous Month Nach
//                  </Link>
//                </li>
//       </div>
      


//       <div className="nach-summary-container">
//         <h2>Current Month's NACH</h2>
//         <Link to="/curr_month" className="nach-summary-cards"> {/* Link to curr_month.js */}
//           <div className="nach-summary-card">
//             <div className="nach-count">
//               <p>NACH to be Presented</p>
//               {/* <span>{currentMonthNachCount}</span> */}
//             </div>
//           </div>
//         </Link>
//       </div>

//       {/* Rest of your home page content goes here */}
//       <div className="content">
//         {/* Display content based on the active tab */}
//         {activeTab === 'Home' && (
//           <div>
//             {/* Home page content */}
//           </div>
//         )}
//         {/* ... similar logic for other tabs */}
//       </div>
//     </div>
//   );
// }

// export default Home;













import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.css'; // Import your CSS file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {PreviousMonth, totalAmnt , failCont} from './prev_month';
import {CurrentMonth, totalAmnt_2 , failCont_2} from './curr_month';
import moment from 'moment';

function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();

  const [lastMonthNachData, setLastMonthNachData] = useState(null);
  const [currentMonthNachCount, setCurrentMonthNachCount] = useState(0);
  const [totalNachAmount, setTotalNachAmount] = useState(0);

  useEffect(() => { 
    
    // Fetch last month's NACH data (replace with your API call)
    const fetchLastMonthNachData = async () => {
      const response = await fetch('/api/last-month-nach'); // Replace with your API endpoint
      const data = await response.json();
      setLastMonthNachData(data);
    };

    // Fetch current month's NACH count (replace with your API call)
    const fetchCurrentMonthNachCount = async () => {
      const response = await fetch('/api/current-month-nach-count'); // Replace with your API endpoint
      const count = await response.json();
      setCurrentMonthNachCount(count);
    };

    fetchLastMonthNachData();
    fetchCurrentMonthNachCount();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  PreviousMonth();
  CurrentMonth();


  return (
    <div className="home-container">
      <header className="header">
        {/* Add your company logo image here */}
        {/* <img src="./logo.png"  alt="company logo"/> */}
        <Link to="/" className="logo">
          <img src="./logo.png" alt="company logo" />
        </Link>
        <nav className="nav">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" onClick={() => handleTabClick('Home')}>
                Home
              </Link>
            </li>
            <li className={location.pathname === '/display' ? 'active' : ''}>
              <Link to="./display" onClick={() => handleTabClick('Display')}>
                Nach Presented
              </Link>
            </li>
            {/* <li className={location.pathname === '/past-nach' ? 'active' : ''}>
              <Link to="/past-nach" onClick={() => handleTabClick('Past Nach')}>
                Today's Nach
              </Link>
            </li> */}
            <li className={location.pathname === '/todays_nach' ? 'active' : ''}>
              <Link to="/todays_nach" onClick={() => handleTabClick('Todays Nach')}>
                Today's Nach
              </Link>
            </li>
            <li className={location.pathname === '/all-nach' ? 'active' : ''}>
              <Link to="/nach_presentation" onClick={() => handleTabClick('All Nach')}>
                All Nach
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      

<div className="nach-summary-wrapper">
        <div className="nach-summary-container">
          <h1>Last Month's NACH</h1>
          <Link to="/prev_month" className="nach-summary-cards"> {/* Link to prev_month.js */}
            <div className="nach-summary-card">
              <div className="nach-count">            
                {/* {lastMonthNachData ? (
                  <span>{lastMonthNachData}</span>
                ) : (
                  
                
    
                )} */}
                <div className="total-amount-fail-count"> 
                <div className="total-amount"> {/* Inner container for total amount */}
            <span>{totalAmnt.toFixed(2)}</span>
            <p>Total Amount</p>
          </div>
          
          <div className="total-fail"> {/* Inner container for total fail */}
            <span>{failCont}</span>
            <p>Total Fail</p>
          </div>
          </div>
        
                
              </div>
            </div>
          </Link>
        </div>

        <div className="nach-summary-container">
          <h1>Current Month's NACH </h1>
          <Link to="/curr_month" className="nach-summary-cards"> {/* Link to curr_month.js */}
            <div className="nach-summary-card">
              <div className="nach-count">
                
                {/* Display current month's NACH count */}
                {/* <span>{currentMonthNachCount}</span> */}
                {/* <span>{totalAmnt_2}</span>
                <p>Total Amount</p>
                <br />
                <span>{failCont_2}</span>
                <p>Total Fail</p> */}
                 <div className="total-amount-fail-count"> {/* New class for container */}
          <div className="total-amount"> {/* Inner container for total amount */}
            <span>{totalAmnt_2.toFixed(2)}</span>
            <p>Total Amount</p>
          </div>
          <br />
          <br />
          <div className="total-fail"> {/* Inner container for total fail */}
            <span>{failCont_2}</span>
            <p>Total Fail</p>
          </div>
        </div>
              </div>
            </div>
          </Link>
        </div>
      </div>



      {/* Rest of your home page content goes here */}
      <div className="content">
        {/* Display content based on the active tab */}
        {activeTab === 'Home' && (
          <div>
            {/* Home page content */}
          </div>
        )}
        {/* ... similar logic for other tabs */}
      </div>
    </div>
  );
}
// import { formGroupClasses } from '@mui/material';

export default Home;






// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './home.css'; // Import your CSS file
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import PreviousMonth from './prev_month';
// import PreviousMonth, { TotalAmount } from './prev_month';

// function Home() {
//   const [activeTab, setActiveTab] = useState('Home');
//   const location = useLocation();

//   const [lastMonthNachData, setLastMonthNachData] = useState(null);
//   const [currentMonthNachCount, setCurrentMonthNachCount] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0); // State for total amount

//   useEffect(() => {
//     // Fetch last month's NACH data and calculate total amount (replace with your API call)
//     const fetchLastMonthNachData = async () => {
//       const response = await fetch('/api/last-month-nach'); // Replace with your API endpoint
//       const data = await response.json();
//       setLastMonthNachData(data);

//       // Call PreviousMonth component to fetch and calculate total amount
//       const total = await PreviousMonth.getTotalAmount(); // Replace with appropriate method if different
//       setTotalAmount(total);
//     };

//     fetchLastMonthNachData();

//     // Fetch current month's NACH count (replace with your API call)
//     const fetchCurrentMonthNachCount = async () => {
//       const response = await fetch('/api/current-month-nach-count'); // Replace with your API endpoint
//       const count = await response.json();
//       setCurrentMonthNachCount(count);
//     };

//     fetchCurrentMonthNachCount();
//   }, []);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="home-container">
//       <header className="header">
//         {/* ... your header content ... */}
//       </header>

//       <div className="nach-summary-wrapper">
//         <div className="nach-summary-container">
//           <h1>LAST MONTH NACH</h1>
//           <Link to="/prev_month" className="nach-summary-cards">
//             <div className="nach-summary-card">
//               <div className="nach-count">
//                 <p>LAST MONTH NACH</p>
//                 <span>{lastMonthNachData ? lastMonthNachData : '-'}</span>
//               </div>
//               <div className="nach-total">
//                 <p>TOTAL AMOUNT</p>
//                 <span>{totalAmount.toFixed(2)}</span> {/* Display total amount with 2 decimal places */}
//               </div>
//             </div>
//           </Link>
//         </div>
//         {/* ... other summary cards ... */}
//       </div>

//       {/* ... rest of your home page content ... */}
//     </div>
//   );
// }

// export default Home;








































