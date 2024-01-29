const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const nodemailer = require("nodemailer");
const mailBody = require("./constants/mailBody");

const app = express();
const port = 5050;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { 
    user: process.env.PRAISE_ARRAY_EMAIL,
    pass: process.env.PRAISE_ARRAY_PASSWORD,
  },
});

app.get("/", (req, res) => {
  res.send("PraiseArray server working");
});

app.post("/register", async (req, res) => {
  console.log("Register:::", req.body);

  const { userName, email, phoneNumber, businessName, businessDescription, workType, currentWebsiteUrl } = req.body;

  if (!userName || !email || !phoneNumber || !businessName) {
    console.log("Fields are missing in the request:", req.body);
    return res.status(400).json({ error: "All fields are required !" });
  }

  try {
    const UserMailOptions = {
      from: process.env.PRAISE_ARRAY_EMAIL,
      to: email,
      subject: "Welcome to PraiseArray ",
      html: mailBody.getUserMailBody({ name: userName }),
    };

    const AdminMailOptions = {
      from: process.env.PRAISE_ARRAY_EMAIL,
      to: 'abhiseknlandge@gmail.com',
      subject: `${userName} wants to connect with PraiseArray`,
      html: mailBody.getAdminMailBody({ userName, email, phoneNumber, businessName, businessDescription, workType, currentWebsiteUrl }),
    };

    transporter.sendMail(UserMailOptions, (userMailError, userData) => {
      if (userMailError) {
        console.log("Error sending user mail =>", userMailError);
      } else {
        console.log("User Mail sent successfully", userData);
      }
    });

    transporter.sendMail(AdminMailOptions, (adminMailError, adminData) => {
      if (adminMailError) {
        console.log("Error sending admin mail =>", adminMailError);
      } else {
        console.log("Admin Mail sent successfully", adminData);
      }
    });

    res.status(201).json({
      status: 201,
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
