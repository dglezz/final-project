"use client";
import styles from "./styles/Landing.module.css";
import { useAuth } from "./context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/dashboard");
  }, [authUser]);

  return (
    <div className={styles.pageWrapper}>
      <h1>Welcome to Hobbying</h1>
      <p>Share your hobbies and connect with others.</p>
      <div className={styles.buttons}>
        <button onClick={() => router.push("/login")}>Log In</button>
        <button onClick={() => router.push("/create")}>Sign Up</button>
      </div>
    </div>
  );
}
