"use client";
import CreateUserForm from "../components/createUserForm";
import { useAuth } from "../context/AuthUserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Forms.module.css";

export default function CreateUser() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/");
  }, [authUser]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <h2>Sign Up</h2>
        <CreateUserForm />
      </div>
    </div>
  );
}
