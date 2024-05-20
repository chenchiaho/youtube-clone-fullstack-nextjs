import Image from "next/image"
import Link from "next/link"

import styles from "./navnar.module.css"

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={20}
                    priority
                    src="/youtube-logo.svg"
                    alt="YouTube Logo"
                />
            </Link>
        </nav>
    )
}
