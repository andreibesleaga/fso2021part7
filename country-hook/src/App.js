import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
      getCountry(name).then(response => {
        console.log('response country:', response.name)
        setCountry(response)  
      })      
    }, [name]
  )
  return country
}

const getCountry = async (name) => {
  const config = {
      method: 'GET',
      url: `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  }
  var country = {}
  country.found = false
  if(name) {
    try {
      let res = await axios(config)
      console.log('getCountry: ',res.status, res.data);
      if(res.status=='200') {
        country = res.data[0]
        country.found = true
        return country
      }  
    } catch (err) {
      console.log('webservice error: ',err);
    }
    return country
  }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
