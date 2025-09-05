import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchAllPosts } from '../../utils/firebase';
import Spinner from '../Spinner/Spinner';

function PostView() {
    const { id, uid } = useParams();  
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null)
    console.log("Post Data Debugging", post);

    useEffect(() => {
        (async () => {
        try {
            setLoading(true);
            const p = await fetchAllPosts({ postId: id, uid: uid });
            setPost(p);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    if (loading) return <Spinner/>

  return (
    <section className="max-w-screen-xl mx-auto mt-4 mb-4 flex">
        <article>
            <img src={post[0]?.imageUrl} className="h-full w-full"></img>
        </article>
    </section>
  )
}

export default PostView