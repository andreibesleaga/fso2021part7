import blogService from '../services/blogs'

/*
const asObject = () => {
  return {[
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  ]}
}
*/

const initialState = []

const blogReducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
  case 'NEW':
    return [...state, action.data]
  case 'LIKE': {
    let id = action.data.id
    let blogToChange = state.find(a => a.id === id)
    let changedblog = {
      ...blogToChange,
      likes: blogToChange.likes+1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedblog
    )
  }
  case 'FIND': {
    let id = action.data.id
    return state.find(a => a.id === id)
  }
  case 'DELETE': {
    let idd = action.data.id
    //const blogToDelete = state.find(a => a.id === idd)
    // state.splice(blogToDelete,1)
    return state.map(blog =>
      blog.id !== idd ? blog : null
    )
  }
  case 'INIT':
    return action.data
  default:
    return state
  }
}


export const createBlog = (content) => {
  return async dispatch => {
    const newblog = await blogService.create(content)
    dispatch({
      type: 'NEW',
      data: newblog,
    })
  }
}

export const likeBlog = (state,id) => {
  return async dispatch => {
    var entry = state.find(b => b.id === id)
    entry.likes += 1
    const changedBlog = await blogService.update(id,entry)
    dispatch({
      type: 'LIKE',
      data: changedBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const blog = await blogService.erase(id)
    dispatch({
      type: 'DELETE',
      data: blog,
    })
  }
}

export const getBlogById = (id) => {
  return async dispatch => {
    //const blogs = await blogService.getAll()
    dispatch({
      type: 'FIND',
      data: id,
    })
  }
}

export default blogReducer
