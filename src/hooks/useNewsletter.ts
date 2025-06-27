/**
  * Universal Newsletter Hook for React Components
  * Provides newsletter subscription functionality with API integration
  */
import { useState, useCallback } from 'react';

export interface NewsletterSubscriber {
  _id?: string;
  email: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed';
  source?: string;
  ipAddress?: string;
}

export interface NewsletterResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Universal API caller for newsletter operations
const callNewsletterAPI = async (endpoint: string, data: any): Promise<NewsletterResponse> => {
  try {
    const response = await fetch(`/api/newsletter/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'API request failed' 
    };
  }
};

export function useNewsletter() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const subscribe = useCallback(async (email: string, source?: string) => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      const result = await callNewsletterAPI('subscribe', { email, source });
      
      if (result.success || result.message) {
        setSuccess(result.message || 'Successfully subscribed to newsletter!');
      } else {
        setError(result.error || 'Failed to subscribe');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unsubscribe = useCallback(async (email: string) => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await callNewsletterAPI('unsubscribe', { email });
      
      if (result.success || result.message) {
        setSuccess(result.message || 'Successfully unsubscribed from newsletter');
      } else {
        setError(result.error || 'Failed to unsubscribe');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    subscribe,
    unsubscribe,
    isLoading,
    error,
    success,
    clearMessages
  };
}

export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const { subscribe, isLoading, error, success, clearMessages } = useNewsletter();

  const handleSubmit = useCallback(async (e: React.FormEvent, source?: string) => {
    e.preventDefault();
    await subscribe(email, source);
    if (success) {
      setEmail('');
    }
  }, [email, subscribe, success]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error || success) {
      clearMessages();
    }
  }, [error, success, clearMessages]);

  return {
    email,
    setEmail,
    handleSubmit,
    handleEmailChange,
    isLoading,
    error,
    success
  };
}