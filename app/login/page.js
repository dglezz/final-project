"use client";
import styles from "../styles/Forms.module.css";
import LoginForm from "../components/loginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthUserContext";

export default function Login() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/");
  }, [authUser]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <h2>Log In</h2>
        <LoginForm />
        <div className={styles.footer}>
          {`Don't have an account?`}
          <a href="/create">Sign up here</a>
        </div>
      </div>
    </div>
  );
}
