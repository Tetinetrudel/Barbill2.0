import { Button } from 'flowbite-react'
import { FaGoogle } from "react-icons/fa"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../Firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('http://localhost:3000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/?tab=clients')
            }
        } catch (error) {
            console.log(error)
        }
    } 
  return (
    <button
        className="flex items-center justify-center text-blue-700 bg-white border border-blue-700 hover:bg-blue-800 hover:text-white disabled:bg-zinc-300 disabled:text-zinc-600 dark:bg-blue-50 dark:hover:bg-blue-600 rounded-lg py-1 font-semibold"
        size="sm"
        type='submit'
        onClick={handleGoogleClick}
    >
        <FaGoogle className="hover:text-white mr-2"/>
        <p>Continuer avec Google</p>
    </button>
  )
}