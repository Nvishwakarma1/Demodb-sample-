import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  discription: {
    type: String, // Note: keeping 'discription' to match frontend App.jsx spelling
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  }
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
