import React from 'react';
import { Bar } from '../components/Bar';

export function ContactUs() {

  return (
    <div className=' h-screen overflow-x-hidden overflow-y-au '>

      <Bar></Bar>

      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-4">
        <h1 className="text-5xl text-sky-200 font-bold neon-text mb-4">Contact Us</h1>
        <p className="text-xl text-sky-200 max-w-3xl mb-4 ">
          We would love to hear from you! Reach out to us through any of the methods below and we will get back to you as soon as possible.
        </p>
        <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-sky-50">
          <div className="mb-4">
            <label className="block text-left neon-text text-xl mb-1 text-sky-200" htmlFor="name">Name</label>
            <input className="w-full p-2 rounded-lg  bg-gray-700 text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-50" type="text" id="name" name="name" required />
          </div>
          <div className="mb-4">
            <label className="block text-left neon-text text-xl mb-1 text-sky-200 " htmlFor="email">Email</label>
            <input className="w-full p-2 rounded-lg bg-gray-700 text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-50" type="email" id="email" name="email" required />
          </div>
          <div className="mb-4">
            <label className="block text-left neon-text text-xl mb-1 text-sky-200" htmlFor="message">Message</label>
            <textarea className="w-full p-2 rounded-lg bg-gray-700 text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-50" id="message" name="message" rows="4" required></textarea>
          </div>
          <button className="w-full p-2 rounded-lg bg-gray-500 text-sky-200 font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-50" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}