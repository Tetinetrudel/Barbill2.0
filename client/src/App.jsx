import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import Layout from './layouts/Layout'
import LoginLayout from './layouts/LoginLayout'
import PrivateRoute from './components/PrivateRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route element={<LoginLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<h1>Dashboard</h1>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}