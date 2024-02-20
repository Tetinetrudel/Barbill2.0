import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Profile from '../components/users/Profile'
import Settings from './Settings'

export default function DashBoard() {
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {tab === 'profile' && <Profile />}
      {tab === 'sales' && <h1>Point de vente</h1>}
      {tab === 'clients' && <h1>Clients</h1>}
      {tab === 'products' && <h1>Produits</h1>}
      {tab === 'reports' && <h1>Rapports</h1>}
      {tab === 'inventory' && <h1>Inventaire</h1>}
      {tab === 'settings' && <Settings />}
      {tab === 'employees' && <h1>Employés</h1>}
    </div>
  )
}
