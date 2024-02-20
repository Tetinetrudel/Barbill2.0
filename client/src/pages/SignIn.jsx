import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import { TextInput, Button, Alert, Label, Spinner } from "flowbite-react"

import OAuth from '../components/OAuth'

import { BiExclude } from 'react-icons/bi'

export default function SignUp() {
    const [formData, setFormData] = useState({})
    const { loading, error: errorMessage } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.email || !formData.password) {
            dispatch(signInFailure("Veuillez compléter tous les champs avant de soumettre votre inscription"))
        }
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(signInFailure(data.message))
                return
            }
            if(res.ok) {
                dispatch(signInSuccess(data))
                navigate('/?tab=clients')
            }
        } catch (error) {
            dispatch(signInFailure(data.message))
        }
    }

    return (
        <div className='min-h-screen py-32'>
            <div className='flex p-6 w-96 mx-auto flex-col md:flex-row md:items-center gap-5 shadow-lg rounded-md'>
                <div className='flex-1'>
                    <div className="flex justify-center mb-6">
                        <h1 className="flex items-center gap-1 text-blue-700 dark:text-white text-2xl">
                            <BiExclude />
                            <p className="font-semibold">Barbill</p>
                        </h1>
                    </div>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Adresse courriel' />
                            <TextInput
                                sizing="sm"
                                type='email'
                                placeholder='nom@compagnie.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Mot de passe' />
                            <TextInput
                                sizing="sm"
                                type='password'
                                placeholder='***********'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <button 
                            className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 disabled:bg-zinc-300 disabled:text-zinc-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg py-1 font-semibold"
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Chargement ...</span>
                                </>
                                ) : (
                                <p>Se connecter</p>
                            )}
                        </button>
                        <OAuth />
                    </form>
                    
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Vous n'avez pas de compte?</span>
                        <Link to='/sign-up' className='dark:text-blue-400 text-blue-700 hover:text-blue-800 hover:underline'>
                            S'inscrire
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure' onDismiss={() => dispatch(signInFailure(''))}>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    )
}
