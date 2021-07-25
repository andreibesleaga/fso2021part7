import React from 'react'
import { useDispatch } from 'react-redux'
//import { Redirect } from 'react-router-dom'
import { resetUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import store from '../reducers/store'
import { Navigation, StyledLink } from '../styles'

const Menu = () => {
  const dispatch = useDispatch()

  //const user = store.getState().user.user

  const handleLogout = () => {
    dispatch(resetUser())
    window.localStorage.clear()
    dispatch(notify('user logged out',5))
    window.location.reload()
  }

  const UserLink = () => {
    let user=store.getState().user.user
    if( user!==undefined && user!==null ) {
      return ( <span> {user.username} logged in &nbsp; <button id="logout-button" type="submit" onClick={handleLogout}>logout</button> </span>)
    } else {
      return ( <span> no user logged in </span> )
    }
  }

  return (
    <Navigation>
      <StyledLink to="/" >blogs</StyledLink> &nbsp; | &nbsp;
      <StyledLink to="/users" >users</StyledLink> &nbsp; | &nbsp;
      <StyledLink to="/about" >about</StyledLink> &nbsp; | &nbsp;
      <UserLink />
    </Navigation>
  )
}

export default Menu
