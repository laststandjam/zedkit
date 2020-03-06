import React, { useState, useEffect, useContext } from 'react'
import Firebase from './resources/FireBase/firebase'
import Routes from './componets/Routes'
import Navbar from './componets/Navbar'
import './App.css'

const userContext = React.createContext({
  user: null,
})

export const useSession = () => {
  const { user } = useContext(userContext)
  return user
}

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = Firebase.auth.currentUser
    return {
      initializing: !user,
      user,
    }
  })

  function onChange(user) {
    console.log('authstatechanged', user)
    setState({ initializing: false, user })
  }

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = Firebase.auth.onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}

const App = () => {
  
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const { initializing, user } = useAuth()
  if (initializing) {
    return <div>Loading</div>
  }
  return (
    <>
      <userContext.Provider value={{ user }}>
        <Navbar
          isLoggedIn={user}
          currentUser={user}
        
        />
          <Routes />
        
      </userContext.Provider>
    </>
  )
}

export default App

