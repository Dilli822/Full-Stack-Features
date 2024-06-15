const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle the payment initiation
app.post('/khalti-api', (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://a.khalti.com/api/v2/epayment/initiate/',
        headers: {
            'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "return_url": "http://example.com/", // Replace with your actual return URL
            "website_url": "https://example.com/", // Replace with your actual website URL
            "amount": "1000", // Hardcoded amount for demonstration, you can use req.body.amount
            "purchase_order_id": "Order01", // Example purchase order ID
            "purchase_order_name": "test", // Example purchase order name
            "customer_info": {
                "name": "Ram Bahadur", // Example name, you can use req.body.name
                "email": "test@khalti.com", // Example email, you can use req.body.email
                "phone": "9800000001" // Example phone number, you can use req.body.phone
            }
        })
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to initiate Khalti payment' });
        } else {
            try {
                const responseData = JSON.parse(body);
                const paymentUrl = responseData.payment_url;

                // Redirect the user to the Khalti payment URL
                res.redirect(paymentUrl);
            } catch (error) {
                console.error('Error parsing response:', error);
                res.status(500).json({ error: 'Failed to parse Khalti API response' });
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
