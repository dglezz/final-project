"use client";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useAuth } from "../context/AuthUserContext";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { signOut, authUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(); // Log out the user
    router.push("/"); // Redirect to the landing page
  };

  const hideLinksForPages = ["/", "/login", "/create"];
  const isLoginOrCreatePage = pathname === "/login" || pathname === "/create";

  return (
    <header
      className={`${styles.header} ${
        isLoginOrCreatePage ? styles.whiteBackground : ""
      }`}
    >
      <div>
        <h1>Hobbying</h1>
        <nav>
          <ul>
            {authUser ? (
              <>
                {pathname !== "/dashboard" && (
                  <li>
                    <Link href="/dashboard">DASHBOARD</Link>
                  </li>
                )}
                {pathname !== "/profile" && (
                  <li>
                    <Link href="/profile">PROFILE</Link>
                  </li>
                )}
                <li>
                  <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                    LOGOUT
                  </a>
                </li>
              </>
            ) : (
              !hideLinksForPages.includes(pathname) && (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/create">Sign Up</Link>
                  </li>
                </>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
