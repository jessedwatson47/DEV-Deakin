import React, { useEffect, useState, useMemo } from 'react';
import { deleteComment, subscribeToComments, subscribeToPost, updateSolution } from '../../utils/firebase';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Comment from './Comment';

function Comments() {
  const [comments, setComments] = useState([]);
  const [solutionId, setSolutionId] = useState(null);
  const { uid, id } = useParams();
  const { user } = useAuth();

  // subscribe to post
  useEffect(() => {
    if (!uid || !id) return;
    const unsub = subscribeToPost(uid, id, (post) => setSolutionId(post.solutionCommentId ?? null), console.error);
    return () => unsub();
  }, [uid, id]);

  // subscribe to comments
  useEffect(() => {
    if (!uid || !id) return;
    const unsub = subscribeToComments(id, uid, setComments, console.log);
    return () => unsub();
  }, [uid, id]);

  // Put solution at the top
  const sortedComments = useMemo(() => {
    if (!solutionId) return comments;

    const array = [...comments];
    const solutionIndex = array.findIndex(c => c.id === solutionId);
    if (solutionIndex > -1) {
      const [solution] = array.splice(solutionIndex, 1);
      array.unshift(solution);
    }
    return array;
  }, [comments, solutionId]);

  const handleDelete = async (comment) => {
    try {
      await deleteComment(comment);
      setComments((prev) => prev.filter(c => c.id !== comment.id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSolution = async (comment) => {
    try {
      await updateSolution(comment);
      setSolutionId(comment.id);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(comments);
  return (
    <>
      {sortedComments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          solutionId={solutionId}
          currentUserId={user?.uid}
          onDelete={handleDelete}
          onSolution={handleSolution}
        />
      ))}
    </>
  );
}

export default Comments;
