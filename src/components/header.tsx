import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useDisconnect } from "wagmi"
import { useAuthSession } from "../hooks/useAuthSession"
import styles from "./header.module.css"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { userId, userName, isLoggedIn, isLoading } = useAuthSession()
  const { disconnect } = useDisconnect()

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${isLoading ? styles.loading : styles.loaded}`}
        >
          {!isLoggedIn ? (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
            </>
          )
            : (
              <>

                <span className={styles.signedInText}>
                  <span>Signed in as <i>{userName}</i></span>
                  <br />
                  <strong> {userId} </strong>
                </span>
                <a
                  href={`/api/auth/signout`}
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault()
                    disconnect()
                    signOut()
                  }}
                >
                  Sign out
                </a>
              </>
            )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/signin">
              Signin
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">
              protected
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}