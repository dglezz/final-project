"use client";
import styles from "../styles/Forms.module.css";
import { useAuth } from "../context/AuthUserContext";
import { useCallback } from "react";

export default function LoginForm() {
  const { signInWithEmailAndPassword } = useAuth();
  // console.log({ authUser });
  const loginSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      return signInWithEmailAndPassword(email, password);
    },
    [signInWithEmailAndPassword]
  );

  return (
    <form className={styles.formWrapper} onSubmit={(e) => loginSubmit(e)}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />

      <button type="submit">Login User</button>
    </form>
  );
}
