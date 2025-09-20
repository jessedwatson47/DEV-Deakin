import React, { useState } from 'react'
import { callSubscribeToNewsletter } from '../../utils/firebase';
import { useAuth } from '../../context/AuthContext';


function NewsletterSignUp() {

    const [email, setEmail] = useState("");
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = async () => {
      setIsSubmitting(true);
      try {
        const res = await callSubscribeToNewsletter({ email: email.trim().toLowerCase(), displayName: user?.displayName || ""})
        console.log(res);
        
      } catch (err) {
        console.error("Error", err.message);
      } finally {
        setIsSubmitting(false);
        setIsSubscribed(true);
      }
    }




  return (
    <div className="flex gap-2 max-w-screen-sm mx-auto bg-zinc-200 justify-between items-center py-1 px-2 mb-4 mt-4">
        <h5 className="font-semibold text-zinc-800">SIGN UP FOR OUR DAILY INSIDER</h5>
        {!isSubscribed ?
        <>
        <input type="email" placeholder="Enter your email" className="bg-white flex flex-1 py-1 px-2" onChange={(e) => setEmail(e.target.value)}></input>
        <button type="button" disabled={isSubmitting} onClick={handleSubscribe} value={email} className="rounded bg-zinc-900 px-3 py-1 text-m text-white font-medium hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed">Subscribe</button>
        </>
        :
          <span className="font-semibold text-sm">Thank you for subscribing {email}!</span>
        }
    </div>
  )
}

export default NewsletterSignUp