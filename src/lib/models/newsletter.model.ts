import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email address is required.'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^s@]+@[^s@]+.[^s@]+$/, 'Please enter a valid email address.']
  },
  status: { type: String, enum: ['active', 'unsubscribed'], default: 'active' },
  metadata: { source: String, ipAddress: String, userAgent: String }
}, { timestamps: true });

newsletterSchema.index({ email: 1 });
export default newsletterSchema;