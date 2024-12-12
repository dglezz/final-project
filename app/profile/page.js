"use client";

import styles from "../styles/Profile.module.css";
import { useAuth } from "../context/AuthUserContext";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function ProfilePage() {
  const { authUser } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!authUser) return;

    const fetchUserPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("user", "==", authUser.email) // Filter posts by current user
      );
      const querySnapshot = await getDocs(q);
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchUserPosts();
  }, [authUser]);

  return (
    <div className={styles.pageWrapper}>
      <h2>Welcome, {authUser?.email}!</h2>
      <div className={styles.postSection}>
        <h2>Your Posts:</h2>
        <div className={styles.posts}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className={styles.post}>
                <p>{post.content}</p>
                <small>
                  Posted on{" "}
                  {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p>No posts yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}
