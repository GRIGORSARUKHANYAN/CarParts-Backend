const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(cors());

// 🟢 24 ժամում 10 հարցում սահմանափակում
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 ժամ
  max: 10,                       // թույլատրել միայն 10 հարցում
  message: {
    success: false,
    error: "You can send only 10 requests in 24 hours."
  }
});

// 🟢 Կապ MongoDB-ի հետ
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// 🟢 Schema
const contactSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// 🟢 POST /contact + rate limit
app.post("/contact", contactLimiter, async (req, res) => {
  try {
    const { name, surname, phone, email, message } = req.body;

    const newData = new Contact({
      name,
      surname,
      phone,
      email,
      message,
    });

    await newData.save();

    res.status(201).json({ success: true, message: "Contact saved" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// 🟢 Սերվերի գործարկում
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
