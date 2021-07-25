
const emptyUser = {
  username: '',
  password: '',
  user: null
}

const userReducer = (state = emptyUser, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const actiontype = (action.type) ? action.type : 'GET'
  switch(actiontype) {
  case 'SET': {
    state = action.data
    return state
  }
  case 'RESET': {
    state = emptyUser
    return state
  }
  case 'GET' : {
    if(state.user!==null) {
      return state
    } else {
      return null
    }
  }
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: user,
    })
  }
}

export const resetUser = () => {
  return async dispatch => {
    dispatch({
      type: 'RESET',
      data: emptyUser,
    })
  }
}

export const getCrtUser = () => {
  return async dispatch => {
    dispatch({
      type: 'GET',
      data: emptyUser,
    })
  }
}

export default userReducer
