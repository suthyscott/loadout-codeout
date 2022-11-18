import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../store/authContext'

const Header = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div>Header
      <nav>

      <NavLink to='/'>Home</NavLink>
      <NavLink to='/auth'>Auth</NavLink>
      <NavLink to='/addloadout'>Add Loadout</NavLink>
      <NavLink to='/myloadout'>My Loadout</NavLink>
      </nav>
      <button onClick={() => authCtx.logout()}>logout</button>
    </div>
  )
}

export default Header