import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Footer from './components/Footer'

export const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`
export const Input = styled.input`
  margin: 0.25em;
`
export const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`
export const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`
export const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`
export const StyledFooter = styled(Footer)`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`


