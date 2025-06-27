/**
 * Newsletter Data Models
 * TypeScript interfaces and types for newsletter functionality
 */

export interface NewsletterSubscriber {
  _id?: string;
  email: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed';
  source?: string;
  ipAddress?: string;
}

export interface MongoResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NewsletterRequest {
  email: string;
  source?: string;
}

export interface NewsletterUnsubscribeRequest {
  email: string;
}