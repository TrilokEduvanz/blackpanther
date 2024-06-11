const bodyParser = require('body-parser');
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
const port = 3000; // Change to 8080 if needed
cnt = 1; // Used for Id

// Configure DynamoDB (replace with your credentials and region)
AWS.config.update({
    region: 'us-east-1', // Any valid AWS region
    endpoint: 'http://localhost:8000/',
    accessKeyId: 'fakeidaws', // Dummy values
    secretAccessKey: 'fakesecretkey' // Dummy values
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// Function to store question in DynamoDB
async function storeQuestion(NACH_data) {
  const params = {
    TableName: 'new2', // Replace with your DynamoDB table name
    Item: {
            abc : {S: '21'},
            customer_id : {S: NACH_data.customer_id},
            method : {S: NACH_data.method},
            payment_capture : {S: NACH_data.payment_capture},
            auth_type : {S: NACH_data.auth_type},
            max_amount : {S: NACH_data.max_amount},
            expire_at : {S: NACH_data.expire_at},
            beneficiary_name : {S: NACH_data.beneficiary_name },
            account_number : {S: NACH_data.account_number},
            account_type : {S: NACH_data.account_type},
            ifsc_code : {S: NACH_data.ifsc_code},
            receipt : {S: NACH_data.receipt},
            date_of_presentation : {S:NACH_data.date_of_presentation},
            status_after_presentation : {S:NACH_data.status_after_presentation}
    }
  };


  try {
    dynamodb.putItem(params).promise();
    console.log('Putting item...');
    cnt++;
    return true;
  } catch (error) {
    console.error('Error storing question:', error);
    return false;
  }
}

// Route to handle POST request for sending JSON
app.post('/send-json', express.json(), async (req, res) => {
  //question = req.body['question'];
  NACH_data = {
    // abc : '3',
    customer_id : 'test22',
    method : 'emandate',
    payment_capture : '1',
    auth_type : 'netbanking',
    max_amount : '200000',
    expire_at : '43432',
    beneficiary_name : 'kapil',
    account_number : '1121431121541121',
    account_type : 'savings',
    ifsc_code : 'HDFC0000001',
    receipt : 'Receipt No. 18',
    date_of_presentation : '2024-06-10',
    status_after_presentation : 'fail',


  };

  if (!NACH_data) {
    return res.status(400).json({ success: false, error: 'Missing question field' });
  }

  const success = await storeQuestion(NACH_data);

  if (success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: 'Error storing question' });
  }
});



// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });








// const bodyParser = require('body-parser');
// const express = require('express');
// const AWS = require('aws-sdk');
// const cors = require('cors');
// const uuid = require('uuid');

// const app = express();
// const port = 3000; // Change to 8080 if needed
// cnt = 1; // Used for Id (optional, consider using a unique identifier strategy)

// // Configure DynamoDB (replace with your credentials and region)
//  dynamoConfig=AWS.config.update({
//   region: 'us-east-1', // Any valid AWS region
//   endpoint: 'http://localhost:8000/',
//   accessKeyId: 'fakeidaws', // Dummy values
//   secretAccessKey: 'fakesecretkey' // Dummy values
// });

// const dynamodb = new AWS.DynamoDB();
// // const docClient = new AWS.DynamoDB.DocumentClient();
// const docClient = new AWS.DynamoDB.DocumentClient({ service: new AWS.DynamoDB(dynamoConfig) });

// app.use(bodyParser.json());
// app.use(cors());  // Enable CORS

// // Function to store question in DynamoDB
// async function storeQuestion(data) {
//   const params = {
//     TableName: 'new', // Replace with your DynamoDB table name
//     Item: {
//       abc : uuid.v1(),
//         customer_id : data.customer_id,
//         method : data.method,
//         payment_capture : data.payment_capture,
//         auth_type : data.auth_type,
//         max_amount :data.max_amount,
//         expire_at : data.expire_at,
//         beneficiary_name : data.beneficiary_name,
//         account_number : data.account_number,
//         account_type : data.account_type,
//         ifsc_code : data.ifsc_code,
//         receipt : data.receipt
//         // date_of_presentation : data.date_of_presentation,
//         // status_after_presentation : data.status_after_presentation,
//     }
//   };

//   try {
//     const custdata = await docClient.put(params).promise();
//     console.log('Putting item...');
//     cnt++;
//     return true;
//   } catch (error) {
//     console.error('Error storing question:', error);
//     return false;
//   }
// }

// // Route to handle POST request for sending JSON
// app.post('/send-json', express.json(), async (req, res) => {
//    // Access data from the request body
//    console.log(req.body);
//    NACH_data = req.body;
//   /*NACH_data = {
//         abc : uuid.v1(),
//         customer_id : req.body.customer_id,
//         method : req.body.method,
//         payment_capture : req.body.payment_capture,
//         auth_type : req.body.auth_type,
//         max_amount :req.body.max_amount,
//         expire_at : req.body.expire_at,
//         beneficiary_name : req.body.beneficiary_name,
//         account_number : req.body.account_number,
//         account_type : req.body.account_type,
//         ifsc_code : req.body.ifsc_code,
//         receipt : req.body.receipt,
//         date_of_presentation : req.body.date_of_presentation,
//         status_after_presentation : req.body.status_after_presentation,
    
//       };*/
//   if (!NACH_data) {
//     return res.status(400).json({ success: false, error: 'Missing data in request body' });
//   }

//   // Validate NACH_data object properties here (optional)

//   const success = await storeQuestion(NACH_data);

//   if (success) {
//     res.json({ success: true });
//   } else {
//     res.status(500).json({ success: false, error: 'Error storing data' });
//   }
// });

// // Route to scan data from DynamoDB (remains unchanged)
app.get('/fetch-data', async (req, res) => {
  try {
    const params = {
      TableName: 'new2', // Replace with your table name
    };
    const data = await docClient.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).json({ message: 'Error fetching customer data' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
