// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import './home.css';
// // import Home from './home';

// var totalAmnt = 0
// const PreviousMonth = () => {
//   const [customerData, setCustomerData] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const today = moment();
//       const currentMonth = today.month();

//       const response = await axios.get('http://localhost:3000/fetch-data');
//       const lastMonth = moment().subtract(1, 'months').startOf('month');

//       const filteredData = response.data.filter(customer => {
//         const presentationDate = moment(customer.date_of_presentation);
//         return presentationDate.isSameOrAfter(lastMonth, 'day') && presentationDate.month() === currentMonth - 1;
//       });

//       const total = filteredData.reduce((acc, curr) => {
//         const amount = parseFloat(curr.max_amount);
//         return !isNaN(amount) ? acc + amount : acc;
//       }, 0);

//       setCustomerData(filteredData);
//       setTotalAmount(total);

//       // totalAmnt = total;
//       // Pass totalAmount as a prop to Home component after setting it
//       // return <Home totalAmount={total} />;
//     };

//     fetchData();
//   }, []);

//   totalAmnt = totalAmount

//   return (
//     <div className="customer-table-container">
//       <h1>Previous Month's Customers (NACH Presented)</h1>
//       {customerData.length > 0 ? (
//         <>
//           <table className="customer-table">
//             <thead>
//               <tr>
//                 <th>Customer ID</th>
//                 <th>Method</th>
//                 <th>Payment Capture</th>
//                 <th>Auth Type</th>
//                 <th>Max Amount</th>
//                 <th>Expire At</th>
//                 <th>Beneficiary Name</th>
//                 <th>Account Number</th>
//                 <th>Account Type</th>
//                 <th>IFSC Code</th>
//                 <th>Receipt</th>
//                 <th>Date of Presentation</th>
//                 <th>Status After Presentation</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customerData.map((customer) => (
//                 <tr key={customer.customer_id}>
//                   <td>{customer.customer_id}</td>
//                   <td>{customer.method}</td>
//                   <td>{customer.payment_capture}</td>
//                   <td>{customer.auth_type}</td>
//                   <td>{customer.max_amount}</td>
//                   <td>{customer.expire_at}</td>
//                   <td>{customer.beneficiary_name}</td>
//                   <td>{customer.account_number}</td>
//                   <td>{customer.account_type}</td>
//                   <td>{customer.ifsc_code}</td>
//                   <td>{customer.receipt}</td>
//                   <td>{customer.date_of_presentation}</td>
//                   <td>{customer.status_after_presentation}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="total-amount">
//             <p>Total Amount: {totalAmount.toFixed(2)}</p>
//           </div>
//         </>
//       ) : (
//         <p>No customers presented NACH in the previous month.</p>
//       )}
//     </div>
//   );
// };

// export {PreviousMonth, totalAmnt};























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './home.css';


var totalAmnt = 0
var failCont=0
const PreviousMonth = () => {
  const [customerData, setCustomerData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [failCount, setfailcount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const today = moment();
      const currentMonth = today.month();

      const response = await axios.get('http://localhost:3000/fetch-data');
      const lastMonth = moment().subtract(1, 'months').startOf('month');

      const filteredData = response.data.filter((customer) => {
        const presentationDate = moment(customer.date_of_presentation);
        return presentationDate.isSameOrAfter(lastMonth, 'day') && presentationDate.month() === currentMonth - 1;
      });

      const total = filteredData.reduce((acc, curr) => {
        const amount = parseFloat(curr.max_amount);
        return !isNaN(amount) ? acc + amount : acc;
      }, 0);

      // Calculate the number of "fail" entries
      const failCount = filteredData.filter((customer) => customer.status_after_presentation === 'fail').length;

      setCustomerData(filteredData);
      setTotalAmount(total);
      setfailcount(failCount);


      // No need to set totalAmnt here (it's not used)
    };

    fetchData();
  }, []);
  totalAmnt = totalAmount
  failCont = failCount

  return (
    <div className="customer-table-container">
      <h1>Previous Month's Customers (NACH Presented)</h1>
      {customerData.length > 0 ? (
        <>
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
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-amount">
            <p>Total Amount: {totalAmount.toFixed(2)}</p>
          </div>
          <div className="fail-count"> {/* New section for fail count */}
            <p>Number of Failed Entries: {failCount}</p>
          </div>
        </>
      ) : (
        <p>No customers presented NACH in the previous month.</p>
      )}
    </div>
  );
};

export {PreviousMonth, totalAmnt , failCont};
