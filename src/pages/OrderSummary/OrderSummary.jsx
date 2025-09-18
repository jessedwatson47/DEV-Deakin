import React from 'react'
import { useSearchParams } from 'react-router-dom';

function OrderSummary() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
  return (
    <section className="flex gap-6 max-w-screen-xl mx-auto mt-8 justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl">Order Summary</h1>
        <div className="bg-zinc-200 w-full h-full rounded">
            <p>Thanks for becoming a pro DEV@Deakin user.</p>
        </div>
      </div>
    </section>
  )
}

export default OrderSummary