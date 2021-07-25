import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import userService from './services/users'
import  getEntry  from './services/blogs'

import Menu from './components/Menu'
import About from './components/About'
import Blog from './components/Blog'
import Users from './components/Users'
import BlogPage from './components/BlogPage'
import Notification from './components/Notification'

import { StyledFooter, Page } from './styles'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  const matchblog = useRouteMatch('/blogs/:id')
  let blog = null
  let blogid = null
  if(matchblog) {
    blogid = matchblog.params.id
    blog = getEntry(matchblog.params.id)
  }

  const getAllUsers = async () => {
    const response = await userService.getAll()
    return response
  }
  const showusers = getAllUsers()

  const getUserById = async () => {
    const matchuser = useRouteMatch('/users/:id')
    let showuser = null
    if(matchuser && showusers!==undefined && Array.isArray(showusers)) {
      showuser = showusers.find(a => a.id === matchuser.params.id)
    } else {
      showuser = null
    }
    return showuser
  }
  const showuser = getUserById()
  let showuserid = null
  if(showuser) {
    showuserid = showuser.id
  }

  return (
    <Page>
      <div>
        <h2>Blogs</h2>
        <Menu />
        <Notification />
        <br />
        <Switch>
          <Route path="/blogs/:id">
            <Blog key={blogid} blog={blog} />
          </Route>
          <Route path="/users/:id">
            <Users key={showuserid} id={showuserid} />
          </Route>
          <Route path="/users">
            <Users key={showuserid} users={showusers} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <BlogPage />
          </Route>
        </Switch>
        <br />
        <StyledFooter />
      </div>
    </Page>
  )
}

export default App
