const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { discordUsername, age, availability, experience, why, skills } = req.body;

    // Replace with your email details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
        subject: `New Staff Application from ${discordUsername}`,
        text: `
            Discord Username: ${discordUsername}
            Age: ${age}
            Weekly Availability: ${availability}
            Experience: ${experience}
            Why they want to join: ${why}
            Skills: ${skills}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Application submitted successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error submitting application');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
