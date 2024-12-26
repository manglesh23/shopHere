const nodemailer = require("nodemailer");

const sendEmailNotification = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const transporter = nodemailer.createTransport({
    // service: "gmail", // or use another email service like Outlook, Yahoo, etc.
    host: 'smtp.office365.com',
    port: 465, 
    secure: false, // Use false for TLS
    auth: {
      user: "mangleshyadav2@gmail.com", // Your email address
      pass: "16Jan@2023", // Your email password or app password
    },
  });

  const mailOptions = {
    from: email, // Sender's email
    to: "mangleshyadav2@gmail.com", // Your email to receive the form data
    subject: `New Contact Form Submission from ${name}`,
    text: `You have a new message from your website:
    
    Name: ${name}
    Email: ${email}
    Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
};

module.exports = { sendEmailNotification };
