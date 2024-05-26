'use client'

import SignIn from "./sign-in"
import Link from "next/link"
import Image from "next/image"
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import { onAuthStateChangedHelper } from "../firebase/firebase"
import { User } from "firebase/auth"
import Upload from "./upload"


function NavBar() {

    const [user, setUser] = useState<User | null>(null)

    console.log(user)

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user)
        })
        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={20}
                    src="/youtube-logo.svg" alt="YouTube Logo" />
            </Link>
            {
                user && <Upload />
            }
            <SignIn user={user} />
        </nav>
    )
}

export default NavBar
