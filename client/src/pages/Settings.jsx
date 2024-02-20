import React, { useState } from 'react'
import Profile from '../components/users/Profile'
import Security from '../components/users/Security'

export default function Settings() {
    const [view, setView] = useState('profile')
    const handleDeleteUser = async () => {
        
    }
  return (
    <div className='w-11/12 mx-auto mt-10'>
        <h1 className='text-xl text-zinc-800 dark:text-zinc-300 font-semibold mb-4'>Paramêtres de l'application</h1>
        <div className='p-6 rounded-md bg-white dark:bg-zinc-900 dark:border dark:border-zinc-500 w-full h-full mx-auto flex'>
            <div className='w-56 flex flex-col gap-4 justify-start items-start border-r border-r-zinc-200'>
                <button 
                    className='bg-transparent text-sm text-zinc-500 hover:bg-blue-200 hover:text-blue-700 hover:font-medium rounded-md py-1 px-6'
                    value="profile"
                    onClick={(e) => setView(e.target.value)}
                >
                    Profile
                </button>
                <button 
                    className='bg-transparent text-sm text-zinc-500 hover:bg-blue-200 hover:text-blue-700 hover:font-medium rounded-md py-1 px-6'
                    value="security"
                    onClick={(e) => setView(e.target.value)}
                >
                    Sécurité
                </button>
                <button 
                    className='text-red-600 font-medium text-sm py-1 px-6 bg-transparent hover:bg-red-200 rounded-md'
                    onClick={handleDeleteUser}
                >
                    Supprimer le compte
                </button>
            </div>
            <div className='flex-1 px-10'>
                {view === 'profile' && <Profile />}
                {view === 'security' && <Security />}
            </div>
        </div>
    </div>
  )
}
