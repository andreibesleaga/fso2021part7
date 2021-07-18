import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const val = (value) => {
    setValue(value)
  }
  const functions = {
    val
  }
  return [{
    type,
    value,
    onChange
  }, functions]
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
    return response.data
  }
  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    getAll()
    return response.data
  }
  
  const service = {
    create, getAll
  }

  useEffect(() => {
      getAll()
  }, [])

  return [
    resources, service
  ]
}

const App = () => {
  const [content, inputContent] = useField('text')
  const [name, inputName] = useField('text')
  const [number, inputNumber] = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    inputContent.val('')
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    inputName.val('')
    inputNumber.val('')
  }
    
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App