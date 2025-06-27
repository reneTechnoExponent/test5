import React from 'react';
import { useNewsletterForm } from '@/hooks/useNewsletter';

const Newsletter = () => {
  const { email, handleSubmit, handleEmailChange, isLoading, error, success } = useNewsletterForm();

  return (
    <section className="bg-primary-600 py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Fitness Community
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter for workout tips, healthy recipes, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn bg-white text-primary-600 hover:bg-primary-50 disabled:opacity-50"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {error && <p className="mt-3 text-red-200">{error}</p>}
            {success && <p className="mt-3 text-green-200">{success}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;