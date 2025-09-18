import React, {useState} from 'react'
import { sendToChat } from '../../utils/openai'
import ShinyText from '../../components/ShinyText/ShinyText'
import MarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark-dimmed.css";


function About() {
  const [fetching, setFetching] = useState(false);
  const [response, setResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [query, setQuery] = useState("");


  const handleResponse = async () => {
    setFetching(true);
    setIsThinking(true);
    try {
       const r = await sendToChat(query);
       setResponse(r);
    } catch (err) {
      console.err(err.message);
    } finally {
      setFetching(false);
      setIsThinking(false);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value);
  }

  return (
    <section className="flex flex-col max-w-screen-xl mt-4 mx-auto gap-4 items-center ">
      <h1 className="text-2xl font-semibold self-center">About</h1>
      <div className="flex flex-col mb-4 w-[40vw]">
        <div className="bg-white ring-1 ring-zinc-200 p-4 rounded h-[50vh] w-full overflow-scroll max-w-none prose prose-pre:whitespace-pre-wrap">
        {isThinking &&
          <ShinyText text="Thinking..." disabled={!isThinking} speed={3}/>
        }

        <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {response}
        </MarkDown>

        </div>
        <input className="bg-white text-zinc-800 p-4 rounded-b h-10 w-full ring-1 ring-zinc-200 placeholder:text-zinc-500" type="text" onChange={handleChange} value={query} placeholder="Ask DEVBot something..."></input>
        <button disabled={fetching} className="cursor-pointer bg-black text-white rounded-b w-full h-10 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleResponse}>Send</button>
      </div>
    </section>
  )
}

export default About