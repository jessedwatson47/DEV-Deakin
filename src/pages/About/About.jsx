import React from 'react'
import { LoremIpsumText } from '../../components/Footer/LoremIpsum'



function About() {

  return (
    <section className="flex flex-col max-w-screen-xl mt-4 mx-auto gap-4 items-center ">
      <h1 className="text-2xl font-semibold self-center">About</h1>
      <p class="prose whitespace-pre-line">{LoremIpsumText}</p>
    </section>
  )
}

export default About