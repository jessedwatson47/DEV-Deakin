import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-4 w-full bg-teal-500 text-white p-2">
      <div className="flex max-w-screen-xl gap-20 justify-center mx-auto">
        {/* Explore */}
        <div className="flex flex-col gap-1">
          <h4 className="text-lg mb-2 font-semibold">Explore</h4>
          <NavLink to="/" className="text-sm hover:underline hover:underline-offset-3">Home</NavLink>
          <NavLink to="/wall" className="text-sm hover:underline hover:underline-offset-3">Questions</NavLink>
          <NavLink to="/wall" className="text-sm hover:underline hover:underline-offset-3">Articles</NavLink>
          <NavLink to="/wall" className="text-sm hover:underline hover:underline-offset-3">Tutorials</NavLink>
        </div>
        {/* Support */}
        <div className="flex flex-col gap-1">
          <h4 className="text-lg mb-2 font-semibold">Support</h4>
          <NavLink to="/faq" className="text-sm hover:underline hover:underline-offset-3">FAQ</NavLink>
          <NavLink to="/" className="text-sm hover:underline hover:underline-offset-3">Help</NavLink>
          <NavLink to="/contact" className="text-sm hover:underline hover:underline-offset-3">Contact Us</NavLink>
        </div>
        {/* Stay Connected */}
        <div className="flex flex-col gap-1 items-center">
          <h4 className="text-lg mb-2 font-semibold">Stay Connected</h4>
          {/* Social Links */}
          <div className="flex gap-2">
          {/* Facebook */}
          <a href="/" target="_blank" className="">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"/>
            </svg>
          </a>
          {/* Twitter / X*/}
          <a href="/" target="_blank">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="/" target="_blank">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
            </svg>
          </a>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col max-w-screen-xl gap-2 items-center mx-auto">
        <h4 className="font-semibold text-xs">DEV@Deakin {currentYear}</h4>
        <div className="flex gap-2 max-w-screen-xl justify-center mx-auto text-xs">
          <NavLink to="/" className="hover:underline hover:underline-offset-3">Privacy Policy</NavLink>
          <NavLink to="/" className="hover:underline hover:underline-offset-3">Terms and Conditions</NavLink>
          <NavLink to="/" className="hover:underline hover:underline-offset-3">Code of Conduct</NavLink>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer