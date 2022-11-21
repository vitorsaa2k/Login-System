import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import {SignIn} from '../pages/SignIn'
import {SignUp} from '../pages/SignUp'
import {Home} from '../pages/Home'
import {Profile} from '../pages/Profile'


export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile/:user' element={<Profile />} />
      </Routes>
    </Router>
  )
}