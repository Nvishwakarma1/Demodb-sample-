import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Enquiry from './models/Enquiry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes('<username>')) {
  console.warn('⚠️ Please configure a valid MONGODB_URI in backend/.env file');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ Error connecting to MongoDB:', err));
}

// Routes
// POST an enquiry
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, discription, email } = req.body;
    
    // Validate request
    if (!name || !discription || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newEnquiry = new Enquiry({
      name,
      discription,
      email
    });

    const savedEnquiry = await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry saved successfully!', data: savedEnquiry });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({ error: 'Server error while saving the enquiry.' });
  }
});

// GET all enquiries (for testing)
app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Server error while fetching enquiries.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
