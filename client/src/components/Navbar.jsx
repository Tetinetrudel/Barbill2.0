
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { CgProfile } from 'react-icons/cg'
import { CiShoppingCart } from "react-icons/ci"
import { PiUserListFill } from "react-icons/pi"
import { MdOutlineInventory } from "react-icons/md"
import { TbReportMoney } from "react-icons/tb"

export default function Navbar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <nav className='flex items-center justify-center gap-6 mt-4'>
        <Link 
          to='/?tab=sales' 
          className='flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-700 bg-transparent py-1 px-6 hover:bg-zinc-100 rounded-md'
        >
            <CgProfile />
            <span>Vente</span>
        </Link>
        <Link 
          to='/?tab=clients'
          className='flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-700 bg-transparent py-1 px-6 hover:bg-zinc-100 rounded-md'
        >
            <PiUserListFill />
            <span>Clients</span>
        </Link>
        <Link 
          to='/?tab=products' 
          className='flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-700 bg-transparent py-1 px-6 hover:bg-zinc-100 rounded-md'
        >
            <CiShoppingCart />
            <span>Produits</span>
        </Link>
        <Link 
          to='/?tab=inventory' 
          className='flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-700 bg-transparent py-1 px-6 hover:bg-zinc-100 rounded-md'
        >
            <MdOutlineInventory />
            <span>Inventaire</span>
        </Link>
        <Link 
          to='/?tab=reports' 
          className='flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-700 bg-transparent py-1 px-6 hover:bg-zinc-100 rounded-md'
        >
            <TbReportMoney />
            <span>Rapports</span>
        </Link>
    </nav>
  )
}