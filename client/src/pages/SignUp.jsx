import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { TextInput, Button, Alert, Label, Spinner } from "flowbite-react"

import OAuth from '../components/OAuth'

import { BiExclude } from 'react-icons/bi'


export default function SignUp() {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.company || !formData.email || !formData.password) {
            setErrorMessage("Veuillez compléter tous les champs avant de soumettre votre inscription")
        }
        try {
            setLoading(true)
            setErrorMessage(null)
            const res = await fetch('/api/user/create-user', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success === false) {
                setErrorMessage(data.message)
                setLoading(false)
                setFormData({})
                return
            }
              
            if(res.ok) {
                console.log(data)
                navigate('/sign-in')
            }
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen py-32'>
            <div className='flex p-6 w-96 mx-auto flex-col md:flex-row md:items-center gap-5 shadow-lg rounded-md'>
                <div className='flex-1'>
                    <div className="flex justify-center mb-6">
                        <h1 className="flex items-center gap-1 text-blue-700 text-2xl">
                            <BiExclude />
                            <p className="font-semibold">Barbill</p>
                        </h1>
                    </div>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value={`Nom de l'entreprise`} />
                            <TextInput
                                sizing="sm"
                                type='text'
                                placeholder='Compagnie'
                                id='company'
                                onChange={handleChange}
                            />
                        </div>
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
                        <Button
                            color="blue"
                            size="sm"
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                                ) : (
                                <p>S'inscrire</p>
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Déjà inscrit?</span>
                        <Link to='/sign-in' className='text-blue-700 hover:text-blue-800 hover:underline'>
                            Se connecter
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    )
}
