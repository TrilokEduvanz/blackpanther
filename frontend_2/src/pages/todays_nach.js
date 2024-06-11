// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // For making API requests
// import moment from 'moment'; // For date manipulation
// import './home.css'; // Import your CSS file

// const TodaysNach = () => {
//   const [customerData, setCustomerData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const today = moment(); // Get today's date

//       const response = await axios.get('http://localhost:3000/fetch-data'); // Replace with your API endpoint URL

//       const filteredData = response.data.filter(customer => {
//         const presentationDate = moment(customer.date_of_presentation);
//         // Check if presentation date is on the current date (ignoring time)
//         return presentationDate.isSame(today, 'day');
//       });

//       setCustomerData(filteredData);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="customer-table-container">
//       <h1>Today's NACH Details</h1>
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
//         <p>No customers presented NACH today.</p>
//       )}
//     </div>
//   );
// };

// export default TodaysNach;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import moment from 'moment'; // For date manipulation
import './home.css'; // Import your CSS file

const TodaysNach = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const today = moment();
      const response = await axios.get('http://localhost:3000/fetch-data'); // Replace with your API endpoint URL

      const filteredData = response.data.filter((customer) => {
        const presentationDate = moment(customer.date_of_presentation);
        return presentationDate.isSame(today, 'day');
      });

      setCustomerData(
        filteredData.map((customer) => ({ ...customer, isChecked: false }))
      ); // Add isChecked property for checkbox selection
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedData = [...customerData];
    updatedData[index].isChecked = !updatedData[index].isChecked;

    // Update the selectAll state only if all checkboxes are checked/unchecked after the change
    const allChecked = updatedData.every((customer) => customer.isChecked);
    setSelectAll(allChecked);

    setCustomerData(updatedData);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCustomerData(
      customerData.map((customer) => ({ ...customer, isChecked: selectAll }))
    );
  };

  const handleDeselectAll = () => {
    setSelectAll(false);
    setCustomerData(customerData.map((customer) => ({ ...customer, isChecked: false })));
  };

  const handlePresentNach = () => {
    // Implement logic to present NACH for selected customers (using selected checkboxes)
    const selectedCustomers = customerData.filter((customer) => customer.isChecked);
    console.log('Present NACH for selected customers:', selectedCustomers); // Placeholder for now
  };

  const isPresentNachDisabled = customerData.every((customer) => !customer.isChecked);

  return (
    <div className="customer-table-container">
      <h1>Today's NACH Details</h1>
      <div className="nach-action-buttons">
        <button disabled={customerData.length === 0} onClick={handleSelectAll}>
          Select All
        </button>
        <button disabled={customerData.length === 0} onClick={handleDeselectAll}>
          Deselect All
        </button>
        <button disabled={isPresentNachDisabled} onClick={handlePresentNach}>
          Present NACH
        </button>
      </div>
      {customerData.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
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
            {customerData.map((customer, index) => (
              <tr key={customer.customer_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={customer.isChecked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
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
      ) : (
        <p>No customers presented NACH today.</p>
      )}
    </div>
  );
};

export default TodaysNach;
