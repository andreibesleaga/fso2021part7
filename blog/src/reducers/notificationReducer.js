const initialState = ''

const notificationReducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
  case 'SHOW':
    state = action.data
    return state
  case 'HIDE':
    state = ''
    return state
  default:
    return state
  }

}

export const notify = (notification, seconds) => {
  return async dispatch => {
    // clear any prior notifications timeouts
    var highestTimeoutId = setTimeout(';')
    for (var i = 0 ; i < highestTimeoutId ; i++) {
      clearTimeout(i)
    }
    // setTimeout to hide notification after seconds
    setTimeout(() => {dispatch(hideNotify())}, seconds * 1000)
    dispatch({
      type: 'SHOW',
      data: notification,
    })
  }
}

export const hideNotify = () => {
  return {
    type: 'HIDE',
    data: ''
  }
}

export default notificationReducer
