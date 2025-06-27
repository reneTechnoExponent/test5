/**
 * Database Connection Test Component
 * Use this to test your MongoDB connection
 */
import React, { useState } from 'react';
import { databaseService } from '../lib/database';
import { CheckCircle, XCircle, Loader2, Database } from 'lucide-react';

const DatabaseTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const isConnected = await databaseService.testConnection();
      
      setTestResult({
        success: isConnected,
        message: isConnected 
          ? 'Database connected successfully! Newsletter functionality is ready.' 
          : 'Database connection failed. Please check your VITE_MONGO_URI in .env file.'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="animate-on-scroll">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg border shadow-sm">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Database Connection Test</h3>
          <p className="text-sm text-gray-600">
            Test your MongoDB connection to ensure newsletter functionality works
          </p>
        </div>

        <button
          onClick={testConnection}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Testing Connection...
            </span>
          ) : (
            'Test Database Connection'
          )}
        </button>

        {testResult && (
          <div className={`mt-4 p-3 rounded-lg border ${
            testResult.success 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center">
              {testResult.success ? (
                <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              )}
              <span className="text-sm">{testResult.message}</span>
            </div>
          </div>
        )}

                 {!import.meta.env.VITE_MONGO_URI && (
           <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
             <p className="text-sm text-yellow-700">
               <strong>Setup Required:</strong> Add VITE_MONGO_URI to your .env file to enable newsletter functionality.
             </p>
           </div>
         )}
      </div>
    </section>
  );
};

export default DatabaseTest;