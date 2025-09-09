import React, { useState, useEffect } from 'react'
import { fetchAllPosts } from '../../../utils/firebase';
import { useAuth } from '../../../context/AuthContext';
import Spinner from '../../../components/Spinner/Spinner';
import { deletePosts } from '../../../utils/firebase';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, userLoading } = useAuth();
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    console.log(selectedPosts);
    
      useEffect(() => {
        (async () => {
          try {
            setLoading(true);
            const all = await fetchAllPosts({ pageSize: 100, uid: user.uid } );
            setPosts(all);
            console.log(all);
          } catch (e) {
            console.log(e);
            setErr(e);
          } finally {
            setLoading(false);
          }
        })();
      }, []);

    if (userLoading || !posts) return (
    <article className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded items-center justify-center">
      <Spinner/>
    </article>)

    const handleCheck = (postId, checked) => {
        setSelectedPosts((prev) => 
        checked ? [...prev, postId] : prev.filter((post) => post !== postId)
     );
    }
    
    const allChecked = posts.length > 0 && selectedPosts.length === posts.length;
    const handleAllCheck = (checked) => {
        setSelectedPosts(checked ? posts.map(p => p.id) : [])
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deletePosts(selectedPosts);
            setPosts(prev => prev.filter(p => !selectedPosts.includes(p.id)));
        } catch (err) {
            console.log(err);
        }
        finally {
            setIsDeleting(false);
        }
    }



  return (
    <article className="flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] w-[500px] self-center p-10 rounded">
        <div className="flex flex-col gap-4 w-full">
          {posts.length === 0
            ?
              <p className="text-zinc-400 self-center">You haven't made a post yet!</p>
            :
            <table className="text-sm text-left">
                <thead className="text-base text-zinc-700">
                    <tr>
                        <th className="p-2"><input type="checkbox"checked={allChecked} onChange={(e) => handleAllCheck(e.target.checked)} className="accent-teal-600"/></th>
                        <th className="p-2">Title</th>
                        <th className="p-2">Posted</th>
                        <th className="p-2">Type</th>
                    </tr>
                </thead>
                <tbody>
              {posts.map(p => (
              <tr key={p.id} className="even:bg-white odd:bg-zinc-200">
                <td className="p-2"><input type="checkbox" checked={selectedPosts.includes(p.id)} onChange={(e) => handleCheck(p.id, e.target.checked)} className="accent-teal-600"/></td>
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.createdAt.toDate().toLocaleString()}</td>
                <td className="p-2">{p.postType}</td>

              </tr>
              ))}
              </tbody>
            </table>
        }
        {posts.length > 0 ? <button disabled={isDeleting || selectedPosts.length === 0} onClick={handleDelete} className="cursor-pointer bg-red-500 text-white py-2 px-4 hover:bg-red-400 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500">Delete</button> : undefined}
        </div>
    </article>
  )
}

export default Posts