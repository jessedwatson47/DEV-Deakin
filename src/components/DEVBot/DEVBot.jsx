import React, {useState} from 'react'
import { callSendToChat } from '../../utils/firebase'
import ShinyText from '../../components/ShinyText/ShinyText'
import MarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark-dimmed.css";
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'


function DEVBot() {
  const [fetching, setFetching] = useState(false);
  const [response, setResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const handleResponse = async () => {
    setFetching(true);
    setIsThinking(true);
    try {
       const r = await callSendToChat(query);
       setResponse(r.data);
    } catch (err) {
      console.error(err.message);
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
      <div className="flex flex-col w-fit fixed right-2 bottom-2 z-20 items-end">
        {/* Condition */}
        {!isOpen ? 
        <div className="mx-auto flex ring-1 ring-black rounded w-fit gap-4 justify-between bg-black px-4 py-2">
            <div className="flex gap-1">
                <span className="text-zinc-300">Need help? Chat with</span>
                <span className="font-semibold text-white">DEVBot!</span>
            </div>
            <button onClick={() => setIsOpen(true)} className="text-white cursor-pointer hover:text-teal-500"><PlusIcon/></button>
        </div>
        :
        <>
        <div className="flex ring-1 ring-black rounded-t w-[20vw] justify-between bg-black px-4 py-2">
            <div className="flex gap-1">
                <span className="text-zinc-300">You are chatting with: </span>
                <span className="font-semibold text-white">DEVBot!</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white cursor-pointer hover:text-teal-500"><Cross1Icon/></button>
        </div>
        <div className="bg-white ring-1 ring-zinc-200 p-4 h-[50vh] w-[20vw] overflow-scroll overflow-x-auto max-w-none prose prose-pre:whitespace-pre-wrap">
        {isThinking &&
          <ShinyText text="Thinking..." disabled={!isThinking} speed={3}/>
        }

        <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {response}
        </MarkDown>

        </div>
        <input className="bg-white text-zinc-800 p-4 h-10 w-full ring-1 ring-zinc-200 placeholder:text-zinc-500" type="text" onChange={handleChange} value={query} placeholder="Ask DEVBot something..."></input>
        <button disabled={fetching} className="cursor-pointer bg-black text-white rounded-b w-full h-10 ring-1 ring-black disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleResponse}>Send</button>
        </>
        }
    </div>
  )
}

export default DEVBot