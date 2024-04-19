const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = 3000;

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    const { name, email, phone, message } = req.body;

    const whatsappMessage = `Сообщение от: ${name}\nEmail: ${email}\nТелефон: ${phone}\nСообщение: ${message}`;

    client.messages.create({
        body: whatsappMessage,
        from: 'whatsapp:+996707910424',  
        to: `whatsapp:${phone}`
    })
    .then(() => {
        res.json({ success: true });
    })
    .catch(error => {
        console.error(error);
        res.json({ success: false });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
