import React, { useEffect }from 'react'
import { linkGoogle } from '../../../utils/firebase'
import { useAuth } from '../../../context/AuthContext';





function Connections() {
  const { user } = useAuth();


  useEffect(() => {
  user.provi
},[]);
  return (
          <article className="shadow flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded">
       <button className="bg-teal-500 p-2 cursor-pointer text-white" onClick={linkGoogle}>Link Google Account</button>
    </article>
  )
}

export default Connections