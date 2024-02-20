import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
import { toggleTheme } from '../redux/theme/themeSlice'

import { TextInput } from 'flowbite-react'

import { FaSun, FaMoon, FaUsersCog } from 'react-icons/fa'
import { BiExclude, BiSearch, BiLogOut } from 'react-icons/bi'
import { GoBell, GoMail, GoSun, GoMoon } from 'react-icons/go'
import { CiSettings } from 'react-icons/ci'

import Navbar from './Navbar'

export default function Header() {
  const { theme } = useSelector((state) => state.theme)
  const { currentUser } = useSelector((state) => state.user)
  const [notification, setNotification] = useState(false)
  const [message, setMessage] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = () => {}

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/sign-out', {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <nav className='py-3 px-6 bg-white dark:bg-zinc-950'>
      <div className='flex justify-between items-center border-b border-b-zinc-300 pb-4'>
        <Link to='/'>
          <h1 className='flex items-center text-blue-700 dark:text-white text-2xl font-semibold'>
            <BiExclude />
            <span>Barbill</span>  
          </h1>  
        </Link>
        <form className='flex-1 px-96'>
          <TextInput
            icon={BiSearch}
            sizing="sm"
            type='search'
            placeholder='Rechercher ...'
            id='search'
            onChange={handleChange}
          />
        </form>
        <div className='flex items-center justify-between gap-2'>
          <div
            onClick={() => dispatch(toggleTheme())}
            className='rounded-md bg-transparent hover:bg-zinc-100 hover:text-zinc-700 cursor-pointer p-2 relative'
          >
             {theme === 'light' ? <GoMoon /> : <GoSun />}
          </div>
          <div className='rounded-md bg-transparent hover:bg-zinc-100 hover:text-zinc-700 cursor-pointer p-2 relative'>
            <GoBell className='text-xl'/>
            {notification && <span className='bg-red-500 absolute rounded-full w-2 h-2 top-1 right-1'></span>}
          </div>  
          <div className='rounded-md bg-transparent hover:bg-zinc-100 hover:text-zinc-700 cursor-pointer p-2 relative'>
            <GoMail className='text-xl'/>
            {message && <span className='bg-red-500 absolute rounded-full w-2 h-2 top-1 right-1'></span>}
          </div>  
          <div className='relative'>
            <div 
              className='rounded-full border-2 border-zinc-700 dark:border-zinc-200 cursor-pointer w-8 h-8'
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img src={currentUser.profilePicture} className='w-full h-full rounded-full' />
            </div>
            {showUserMenu && (
              <div className='w-56 absolute top-10 right-0 bg-white dark:bg-zinc-900 border border-zinc-100  shadow-sm p-6 divide-y rounded-md' >
                <div className='flex flex-col items-center gap-3 pb-4'>
                  <h2 className='text-sm font-semibold'>{currentUser.company}</h2>
                  <Link 
                    to='/?tab=settings'
                    onClick={() => setShowUserMenu(false)}
                    className='border border-zinc-500 hover:border-zinc-700 py-1 px-6 text-sm bg-white rounded-md text-zinc-500 hover:text-zinc-700'
                  >
                    Profile
                  </Link>
                </div>
                <div className='py-4 flex flex-col gap-2'>
                  <Link 
                    to='/?tab=settings' 
                    onClick={() => setShowUserMenu(false)}
                    className='flex items-center gap-1 bg-transparent hover:bg-zinc-100 dark:hover:text-zinc-700 rounded-md py-1 px-6'
                  >
                    <CiSettings />
                    <span className='text-sm'>Paramêtres</span>
                  </Link>
                  <Link 
                    to='/?tab=employees' 
                    onClick={() => setShowUserMenu(false)}
                    className='flex items-center gap-1 bg-transparent hover:bg-zinc-100 dark:hover:text-zinc-700 rounded-md py-1 px-6'
                  >
                    <FaUsersCog />
                    <span className='text-sm'>Employés</span>
                  </Link>
                </div>
                <div className='pt-4 flex justify-center'>
                  <button 
                    className='flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-sm py-1 px-6'
                    onClick={handleSignout}  
                  >
                    <BiLogOut />
                    <span>Déconnecter</span>
                  </button>
                </div>
              </div>
            )}
          </div>  
        </div>     
      </div>
      <Navbar />
    </nav>
  )
}
