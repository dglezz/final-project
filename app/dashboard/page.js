"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthUserContext";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { authUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!newPost.trim()) return; // Prevent empty posts

    await addDoc(collection(db, "posts"), {
      content: newPost,
      user: authUser.username || authUser.email,
      likes: 0, // Initialize likes
      createdAt: new Date(),
    });

    setNewPost("");
  };

  // Handle liking a post
  const handleLike = async (postId, currentLikes) => {
    const postRef = doc(db, "posts", postId);

    // Increment the like count
    await updateDoc(postRef, { likes: currentLikes + 1 });
  };

  return (
    <div className={styles.pageWrapper}>
      <h1>Welcome, {authUser?.username || authUser?.email}!</h1>
      <form className={styles.postForm} onSubmit={handlePostSubmit}>
        <textarea
          placeholder="Write your post here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <p>{post.content}</p>
            <small>Posted by {post.user}</small>
            <div className={styles.likeSection}>
              <button
                onClick={() => handleLike(post.id, post.likes)}
                className={styles.likeButton}
              >
                Like ({post.likes})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
