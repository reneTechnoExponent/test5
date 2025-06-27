import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
let connection: mongoose.Connection | null = null;

export const connectToDB = () => {
  if (connection && connection.readyState === 1) {
    console.log('Using existing database connection.');
    return connection;
  }
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error('MONGODB_URI is not defined in your environment variables. Please check your .env file.');
  }
  
  // Check if it's just the placeholder URI
  if (connectionString.includes('username:password@cluster.mongodb.net')) {
    console.warn('MongoDB URI appears to be a placeholder. Using in-memory fallback for development.');
    // Return a mock connection for development
    return null;
  }
  
  console.log('Creating new database connection...');
  try {
    connection = mongoose.createConnection(connectionString, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    connection.on('connected', () => console.log('MongoDB connected successfully.'));
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      if (connection) {
        connection.close();
      }
      connection = null;
    });
    connection.on('disconnected', () => {
      console.log('MongoDB disconnected.');
      connection = null;
    });
    return connection;
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    throw error;
  }
};

export const getConnection = () => {
    if (!connection) return connectToDB();
    return connection;

}