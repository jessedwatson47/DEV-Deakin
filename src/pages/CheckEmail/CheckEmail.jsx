import React from 'react'
import { Link } from 'react-router-dom'

function CheckEmail() {
  return (
    <section className="flex flex-col mx-auto max-w-screen-xl min-h-[100dvh] w-full items-center justify-center">
        <article className="flex flex-col items-center gap-2">
            <h1 className="text-4xl text-teal-500">You've successfully registered!</h1>
            <h2 className="text-lg"><i className="font-semibold">An email has been sent for verification</i>, follow the steps to gain full access to DEV@Deakin.</h2>
            <Link to="/" className="mt-6 rounded bg-teal-500 text-white p-2 hover:bg-teal-400 max-w-fit">Go to DEV@Deakin</Link>
        </article>
    </section>
  )
}

export default CheckEmail