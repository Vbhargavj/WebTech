import React from 'react';
import { Bar } from '../components/Bar';

export function AboutUs() {
  return (
    <div>
      <Bar></Bar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-4">

        <h1 className="text-5xl font-bold text-sky-200 neon-text mb-4">About Us</h1>
        <p className="text-xl text-sky-200 max-w-3xl mb-8">
          Welcome to our company! We are dedicated to providing the best service possible. Our team is passionate, driven, and committed to excellence. We believe in the power of innovation and strive to lead in our industry. Thank you for being a part of our journey.
        </p>
        <div className="flex space-x-4">
          <div className="neon-text p-4 rounded-lg bg-gray-800">
            <h2 className="text-3xl text-sky-200 font-semibold mb-2">Our Mission</h2>
            <p className="text-lg text-sky-200">To innovate and lead with passion and dedication.</p>
          </div>
          <div className="neon-text  p-4 rounded-lg bg-gray-800">
            <h2 className="text-3xl text-sky-200 font-semibold mb-2">Our Vision</h2>
            <p className="text-lg text-sky-200">To be the pioneers in our field, inspiring change and growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
