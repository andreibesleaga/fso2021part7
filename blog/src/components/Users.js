import React from 'react'
import { Link } from 'react-router-dom'

const User = (user) => {
  return (
    <div>
      {user.name}
    </div>
  )
}

const Users = (users, id = null) => {

  if(id!==null && users!==null && Array.isArray(users)) {
    let userfound = users.find(user => user.id===id)
    return(
      <div>
        <User key={id} user={userfound} />
      </div>
    )
  } else if(users && Array.isArray(users)) {
    return (
      <div>
        {users.map(user =>
          <Link to={`/users/${user.id}`} key={user.id}>{user.username} {user.name}</Link>
        )}
      </div>
    )
  } else {
    return (
      <div>User(s) not found</div>
    )
  }
}

export default Users