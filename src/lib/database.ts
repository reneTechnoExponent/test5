/**
 * MongoDB Connection Utility
 * Centralized MongoDB connection management with dynamic imports
 */

// Dynamic MongoDB loader function
const loadMongoDB = async () => {
  try {
    // Only load MongoDB in server environment
    if (typeof window === 'undefined' && typeof process !== 'undefined') {
      const mongodb = await import('mongodb');
      return {
        MongoClient: mongodb.MongoClient,
        ServerApiVersion: mongodb.ServerApiVersion
      };
    }
  } catch (error) {
    console.warn('MongoDB not available:', error);
  }
  
  return { MongoClient: null, ServerApiVersion: null };
};

let client: any = null;

export async function connectToMongoDB(): Promise<any> {
  const mongoUri = import.meta.env.VITE_MONGO_URI;
  
  if (!mongoUri) {
    throw new Error('VITE_MONGO_URI environment variable is required');
  }

  if (!client) {
    const { MongoClient, ServerApiVersion } = await loadMongoDB();
    
    if (!MongoClient || !ServerApiVersion) {
      throw new Error('MongoDB not available in this environment. Please ensure MongoDB is installed and available.');
    }

    client = new MongoClient(mongoUri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
  }

  await client.connect();
  return client;
}

export async function disconnectFromMongoDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const testClient = await connectToMongoDB();
    // Try to ping the database
    await testClient.db('admin').command({ ping: 1 });
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// Database service object for easier import
export const databaseService = {
  connect: connectToMongoDB,
  disconnect: disconnectFromMongoDB,
  testConnection
};