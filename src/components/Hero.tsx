import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="pt-20 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container-custom min-h-[80vh] flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Body, <br />
            <span className="text-primary-600">Transform Your Life</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join our expert-led fitness programs and achieve your health goals with personalized training plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#programs" className="btn btn-primary">
              Explore Programs
            </a>
            <a href="#pricing" className="btn btn-secondary">
              View Pricing
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Fitness Training"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;