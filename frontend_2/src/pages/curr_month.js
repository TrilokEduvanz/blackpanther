// import React from 'react'; // Import React for creating components

// function CurrentMonth() {
//   return (
//     <div>
//       <h1>This is the Current Month NACH details</h1>
//       {/* Your content related to current month NACH data goes here */}
//     </div>
//   );
// }

// export default CurrentMonth;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // For making API requests
// import moment from 'moment'; // For date manipulation
// import './home.css'; // Import your CSS file

// const CurrentMonth = () => {
//   const [customerData, setCustomerData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('http://localhost:3000/fetch-data'); // Replace with your API endpoint URL
//       const currentMonth = moment().startOf('month'); // Get start of current month

//       const filteredData = response.data.filter(customer => {
//         const presentationDate = moment(customer.date_of_presentation); // Convert date string to moment object
//         return presentationDate.isSameOrAfter(currentMonth, 'day'); // Check if date is in current month or later
//       });

//       setCustomerData(filteredData);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="customer-table-container">
//       <h1>This is the Current Month's NACH Details</h1>
//       {customerData.length > 0 ? (
//         <table className="customer-table">
//           <thead>
//             <tr>
//               <th>Customer ID</th>
//               <th>Method</th>
//               <th>Payment Capture</th>
//               <th>Auth Type</th>
//               <th>Max Amount</th>
//               <th>Expire At</th>
//               <th>Beneficiary Name</th>
//               <th>Account Number</th>
//               <th>Account Type</th>
//               <th>IFSC Code</th>
//               <th>Receipt</th>
//               <th>Date of Presentation</th>
//               {/* <th>Receipt</th> */}
//               <th>Status After Presentation</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customerData.map((customer) => (
//               <tr key={customer.customer_id}>
//                 <td>{customer.customer_id}</td>
//                 <td>{customer.method}</td>
//                 <td>{customer.payment_capture}</td>
//                 <td>{customer.auth_type}</td>
//                 <td>{customer.max_amount}</td>
//                 <td>{customer.expire_at}</td>
//                 <td>{customer.beneficiary_name}</td>
//                 <td>{customer.account_number}</td>
//                 <td>{customer.account_type}</td>
//                 <td>{customer.ifsc_code}</td>
//                 <td>{customer.receipt}</td>
//                 <td>{customer.date_of_presentation}</td>
//                 <td>{customer.status_after_presentation}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No customers presented NACH in the current month yet.</p>
//       )}
//     </div>
//   );
// };

// export default CurrentMonth;













import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import moment from 'moment'; // For date manipulation
import './home.css'; // Import your CSS file

var totalAmnt_2=0
var failCont_2=0
const CurrentMonth = () => {
  const [customerData, setCustomerData] = useState([]);
  const [totalAmount_2, setTotalAmount_2] = useState(0);
  const [failCount_2, setfailcount_2] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const today = moment();
      const currentMonth = today.month(); // Get current month (0-indexed)

      const response = await axios.get('http://localhost:3000/fetch-data'); // Replace with your API endpoint URL
      const currentMonthStart = moment().startOf('month'); // Get start of current month

      const filteredData = response.data.filter(customer => {
       const presentationDate = moment(customer.date_of_presentation);
       return presentationDate.isSameOrAfter(currentMonthStart, 'day') && presentationDate.month() === currentMonth; // Check if month matches current month (optional)
     });
     
     const total_2 = filteredData.reduce((acc, curr) => {
      const amount = parseFloat(curr.max_amount);
      return !isNaN(amount) ? acc + amount : acc;
    }, 0);

    const failCount_2 = filteredData.filter((customer) => customer.status_after_presentation === 'fail').length;

      setCustomerData(filteredData);
      setTotalAmount_2(total_2);
      setfailcount_2(failCount_2);
    };

    fetchData();
  }, []);
  
  totalAmnt_2 = totalAmount_2
  failCont_2 = failCount_2

  return (
    <div className="customer-table-container">
      <h1>This is the Current Month's NACH Details</h1>
      {customerData.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Method</th>
              <th>Payment Capture</th>
              <th>Auth Type</th>
              <th>Max Amount</th>
              <th>Expire At</th>
              <th>Beneficiary Name</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>IFSC Code</th>
              <th>Receipt</th>
              <th>Date of Presentation</th>
              <th>Status After Presentation</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.method}</td>
                <td>{customer.payment_capture}</td>
                <td>{customer.auth_type}</td>
                <td>{customer.max_amount}</td>
                <td>{customer.expire_at}</td>
                <td>{customer.beneficiary_name}</td>
                <td>{customer.account_number}</td>
                <td>{customer.account_type}</td>
                <td>{customer.ifsc_code}</td>
                <td>{customer.receipt}</td>
                <td>{customer.date_of_presentation}</td>
                <td>{customer.status_after_presentation}</td>
                {/* <p>Total Amount: {failCount_2}</p> */}
              </tr>
              
            ))}
          </tbody>
        </table>
        
      ) : (
        <p>No customers presented NACH in the current month yet.</p>
      )}
    </div>
  );
};

export  {CurrentMonth,totalAmnt_2 , failCont_2};
