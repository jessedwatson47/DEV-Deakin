import React from 'react'
import { LoremIpsumText } from '../../components/Footer/LoremIpsum'

function Contact() {
  return (
    <section className="flex gap-4 flex-col mx-auto max-w-screen-xl mt-4 w-fit items-center">
      <h1 className="text-2xl font-semibold self-center">Contact</h1>
      <p class="prose whitespace-pre-line">{LoremIpsumText}</p>
    </section>
  )
}

export default Contact