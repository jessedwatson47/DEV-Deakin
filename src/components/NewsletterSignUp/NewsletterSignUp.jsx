import React, { useState } from 'react'

function NewsletterSignUp() {
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmail( (prev) => {
            return {...prev, [name]: value}
    })
    }


  return (
    <div className="flex gap-2 max-w-screen-sm mx-auto bg-zinc-200 justify-between items-center py-1 px-2 mb-4 mt-4">
        <h5 className="font-semibold text-zinc-800">SIGN UP FOR OUR DAILY INSIDER</h5>
        <input type="email" placeholder="Enter your email" className="bg-white flex flex-1 py-1 px-2" onChange={handleChange}></input>
        <button type="button" onClick="" value={email} className="rounded bg-zinc-900 px-3 py-1 text-m text-white font-medium hover:opacity-90">Subscribe</button>
    </div>
  )
}

export default NewsletterSignUp