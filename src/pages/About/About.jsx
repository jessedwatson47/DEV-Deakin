import React, {useState} from 'react'
import { sendToChat } from '../../utils/openai'
import ShinyText from '../../components/ShinyText/ShinyText'
import MarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark-dimmed.css";
import DEVBot from '../../components/DEVBot/DEVBot'


function About() {

  return (
    <section className="flex flex-col max-w-screen-xl mt-4 mx-auto gap-4 items-center ">
      <h1 className="text-2xl font-semibold self-center">About</h1>
    </section>
  )
}

export default About