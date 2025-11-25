const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// ✅ Trust proxy for Render (X-Forwarded-For)
app.set("trust proxy", 1);

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Rate limit: 24 ժամում 10 հարցում ամեն IP-ի համար
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 ժամ
  max: 10,
  message: {
    success: false,
    error: "You can send only 10 requests in 24 hours."
  }
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ✅ Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ POST /contact route + rate limit
app.post("/contact", contactLimiter, async (req, res) => {
  try {
    const { name, surname, phone, email, message } = req.body;

    const newContact = new Contact({
      name,
      surname,
      phone,
      email,
      message
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Contact saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
