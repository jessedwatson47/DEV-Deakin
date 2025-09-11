import React from 'react'
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion'

function FAQ() {
  return (
    <section className="flex gap-4 flex-col mx-auto max-w-screen-xl mt-4 w-fit items-center">
      <h1 className="text-2xl font-semibold self-center">FAQ</h1>
      <FAQAccordion/>
    </section>
  )
}

export default FAQ