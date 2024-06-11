// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // For making API requests
// import './home.css';
// const Display = () => {
//   const [customerData, setCustomerData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('http://localhost:3000/fetch-data'); // Replace with your API endpoint URL
//       setCustomerData(response.data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="customer-table-container">
//       <h1>Customers</h1>
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
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No customers found.</p>
//       )}
//     </div>
//   );
// };

// export default Display;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import './home.css'; // Import your CSS file

const Display = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]); // State for selected customers

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/fetch-data'); // Replace with your API endpoint URL
      setCustomerData(response.data);
    };
    fetchData();
  }, []);

  const handleSelectCustomer = (customerId) => {
    const isSelected = selectedCustomers.includes(customerId);
    setSelectedCustomers(isSelected ? selectedCustomers.filter(id => id !== customerId) : [...selectedCustomers, customerId]);
  };

  const handleSelectAll = () => {
    setSelectedCustomers(customerData.map(customer => customer.customer_id));
  };

  const handleDeselectAll = () => {
    setSelectedCustomers([]);
  };

  const handlePresentNach = () => {
    // Implement logic to handle presenting NACH for selected customers (e.g., API call)
    console.log('Presenting NACH for selected customers:', selectedCustomers);
  };

  return (
    <div className="customer-table-container">
      <h1>Customers</h1>
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
              <th>Receipt</th>
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

                <td>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.customer_id)}
                    onChange={() => handleSelectCustomer(customer.customer_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}
      <div className="button-container">
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleDeselectAll}>Deselect All</button>
        <button onClick={handlePresentNach} disabled={selectedCustomers.length === 0}>Present NACH</button>
      </div>
    </div>
  );
};

export default Display;
