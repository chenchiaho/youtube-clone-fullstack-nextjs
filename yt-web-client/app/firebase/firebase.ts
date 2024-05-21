// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User
} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYA3r-WlPsYKg9A8ENsnJ6X4PChlptJQM",
    authDomain: "yt-clone-bf738.firebaseapp.com",
    projectId: "yt-clone-bf738",
    appId: "1:1034115008879:web:c7fd17ba71b18de37e009a"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

// Signs the user in with a Google popup
export const signInWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider())
}

// Signs the user in with a Google popup
export const signOut = () => {
    return auth.signOut()
}

// Trigger a callback when user auth state changes
export const onAuthStateChangedHelper = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback)
}