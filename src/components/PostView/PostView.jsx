import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchAllPosts } from '../../utils/firebase';
import Spinner from '../Spinner/Spinner';
import Comments from '../Comments/Comments';
import NewComment from '../NewComment.jsx/NewComment';
import Like from '../Like/Like';
import { doLike } from '../../utils/firebase';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

function PostView() {
    const { id, uid } = useParams();  
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null)
    const [likeCount, setLikeCount] = useState(0);
    console.log("Post Data Debugging", post);

    useEffect(() => {
        (async () => {
        try {
            setLoading(true);
            const p = await fetchAllPosts({ postId: id, uid: uid });
            setPost(p[0]);
            setLikeCount(p[0].likeCount)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    // Plyr
    useEffect(() => {
        if (!post?.videoUrl) return;
        const player = new Plyr('#player');
    },[post?.videoUrl]);

     const handleLike = async (e, authorId, postId) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(postId)
    
        try{
            await doLike(authorId, postId)
            setLikeCount(prev => prev + 1)
        } catch (err) {
          console.log(err);
        }
      
      }

    if (loading) return <div className="w-fit mx-auto"><Spinner/></div>

  return (
    <section className="max-w-screen-xl mx-auto mt-4 mb-4 flex">
        <article className='flex gap-8 w-full p-4'>
            {/* Media Col */}
            {post?.imageUrl &&
                <div className="h-auto w-[70%] flex items-center ">
                    <img src={post?.imageUrl} className="h-full w-full object-cover"></img>
                </div>
            }

            {post?.videoUrl &&
                <div className="h-full w-[70%] justify-center items-center">
                    <video id="player" controls className="h-full w-full">
                        <source src={post?.videoUrl}/>
                    </video>
                </div>
            }
            {/* Text Col */}
            <div className="flex flex-col gap-2 bg-zinc-100 h-full p-4 w-[30%] mx-auto shadow">
                <div className="flex gap-4 items-center">
                    <img src={post?.authorPhoto} alt="Author Photo" className="w-10 h-10 rounded-full object-cover"></img>
                    <div className="flex flex-col">
                        <span className="text-lg">{post?.authorName}</span>
                        <p className="text-xs text-zinc-500">Posted at {post?.createdAt.toDate().toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-base">{post?.title}</h1>
                    <p className="text-base">{post?.desc || post?.article || post?.question}</p>
                </div>
                {/* Actions */}
                <div className="mt-4 mb-4">
                    <Like handleLike={(e) => handleLike(e, post.userId, post.id)} likes={likeCount}/>
                </div>
                {/* Comment */}
                <NewComment />
                <Comments />
            </div>
            
        </article>
    </section>
  )
}

export default PostView