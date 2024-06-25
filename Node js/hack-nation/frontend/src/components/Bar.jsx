import React from 'react';

export function Bar() {
  return (
    <nav className="bg-gray-800 p-2">
      <div className="container mx-auto flex items-center justify-between px-5">
        <div className="flex items-center space-x-16">
          <div className="text-white text-lg font-bold">MySite</div>
          <ul className="flex space-x-9">
            <li><a href="/home" className="text-white hover:text-gray-400">Home</a></li>
            <li><a href="/about-us" className="text-white hover:text-gray-400">About</a></li>
            <li><a href="/contact-us" className="text-white hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        <div className="flex items-center px-5 space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="rounded-full  h-8 w-8 bg-slate-200 flex items-center justify-center">
            <div className="text-xl ">B</div>
          </div>
          <div className="text-white ">Hello</div>
          
        </div>
      </div>
    </nav>
  );
}
