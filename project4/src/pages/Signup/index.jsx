import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Firebase from '../../resources/FireBase/firebase'
import {useSession} from '../../App'
const Signup = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
  })
  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState(null)
  const user = useSession()
  const handleChange = evt => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const handleFormSubmit = async e => {
    const { username, email, passwordOne } = state
    e.preventDefault()
    try {
      const res = await Firebase.doCreateUserWithEmailAndPassword(
        email,
        passwordOne
      )
      const user = await Firebase.auth.currentUser
      try {
        console.log(user / 'hit')
        Firebase.database.collection('users')
          .doc(user.uid)
          .set({
            userName: username,
            balance: 100
          })
        console.log(`saved ${user} to db collection`)
      } catch (error) {
        console.log('failed to db collection', error)
      }
      setIsAuth(true)
    } catch (error) {
      setError(error)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const isInvalid =
    state.passwordOne !== state.passwordTwo ||
    state.passwordOne === '' ||
    state.email === '' ||
    state.username === ''

  if (user) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1>SIGN UP</h1>
      <form onSubmit={handleFormSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input
            placeholder='Username'
            name='username'
            value={state.username}
            onChange={handleChange}
          />
          <input
            placeholder='Email'
            name='email'
            type='email'
            value={state.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder='Password'
            name='passwordOne'
            type='password'
            value={state.passwordOne}
            onChange={handleChange}
            required
          />
          <input
            placeholder='Confirm Password'
            name='passwordTwo'
            type='password'
            value={state.passwordTwo}
            onChange={handleChange}
            required
          />
          <button disabled={isInvalid} type='submit'>
            Submit
          </button>
        </div>
      </form>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </div>
  )
}

export default Signup