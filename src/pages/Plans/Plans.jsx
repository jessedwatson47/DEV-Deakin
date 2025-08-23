import React from 'react'
import Card from '../../components/Card/Card'
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'

function Plans() {
  return (
    <section className="flex flex-col max-w-screen-xl min-h-[100dvh] w-fit mx-auto gap-4 mt-8">
        <h1 className="text-2xl">Plans</h1>
        <div className="flex gap-4">
            {/* Free Plan */}
            <article>
                <Card className="gap-4 w-[380px] h-fit">
                    <div className="rounded-full font-semibold bg-zinc-700 text-white px-3 py-1 w-fit">Personal</div>
                    <div className="flex gap-1">
                        <h2 className="text-4xl">Free</h2>
                    </div>
                    <p>Explore free features with limited access</p>
                    <div className="h-[1px] bg-zinc-200 w-full"></div>
                    <ul className="flex flex-col gap-4">
                        <li className="flex gap-2 items-center text-green-500"><CheckCircledIcon/>View Posts</li>
                        <li className="flex gap-2 items-center text-green-500"><CheckCircledIcon/>Chat with DEVbot</li>
                        <li className="flex gap-2 items-center text-red-500"><CrossCircledIcon/>Make Posts</li>
                        <li className="flex gap-2 items-center text-red-500"><CrossCircledIcon/>Add Friends</li>
                    </ul>
                    <button className="cursor-pointer mt-4 rounded bg-zinc-900 px-3 py-2 text-m text-white font-medium hover:opacity-90">Sign Up</button>
                </Card>
            </article>
            {/* Pro Plan */}
            <article>
                <Card className="gap-4 w-[380px] h-fit border-[2px] [background:linear-gradient(0deg,#ffe48a,#ffffff_65%,#ffffff)_padding-box,conic-gradient(from_var(--border-angle),#fcd34d_80%,#f57402_100%)_border-box] border border-transparent animate-border">
                    <div className="rounded-full font-semibold bg-amber-300 text-zinc-700 px-3 py-1 w-fit">Pro</div>
                    <div className="flex gap-1 items-center">
                        <h2 className="text-4xl">$15</h2>
                        <span className="text-xs">per month</span>
                    </div>
                    <p>Get the best benefits for a low cost</p>
                    <div className="h-[1px] bg-zinc-200 w-full"></div>
                    <ul className="flex flex-col gap-4">
                        <li className="flex gap-2 items-center text-green-500"><CheckCircledIcon/>View Posts</li>
                        <li className="flex gap-2 items-center text-green-500"><CheckCircledIcon/>Chat with DEVbot</li>
                        <li className="flex gap-2 items-center text-green-500"><CheckCircledIcon/>Make Posts</li>
                        <li className="flex gap-2 items-center text-green-500"><CheckCircledIcon/>Add Friends</li>
                    </ul>
                    <button className="cursor-pointer mt-4 rounded bg-amber-300 px-3 py-2 text-m text-zinc-700 font-medium hover:bg-amber-200 hover:text-zinc-800">Subscribe</button>
                </Card>
            </article>
        </div>
    </section>
  )
}

export default Plans