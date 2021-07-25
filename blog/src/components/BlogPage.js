import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { notify } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { createBlog } from '../reducers/blogReducer'
import store from '../reducers/store'

import Blog from './Blog'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import blogService from '../services/blogs'
import loginService from '../services/login'


const BlogPage = () => {

  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.user.username)
  const password = useSelector(state => state.user.password)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser({ username:username, password:password, user:user }))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      dispatch(setUser({ username:'', password:'', user:user }))
      window.location.reload()
    } catch (exception) {
      dispatch(notify('wrong credentials',5))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => dispatch(setUser({ username:target.value, password:password, user:null }))}
        handlePasswordChange={({ target }) => dispatch(setUser({ username:username, password:target.value, user:null }))}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(notify('created blog entry: ' + JSON.stringify(blogObject),5))
  }

  const blogForm = () => (

    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {store.getState().user.user === null ? loginForm() :
        <div>
          {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogPage
