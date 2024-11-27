import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { getCurrentUser } from "../lib/appwrite"
import useAppwrite from '@/hooks/useAppwrite'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const { data: user, setData: setUser, fetchData: fetchCurrentUser, isFetching: isFetchingUser } = useAppwrite(useCallback(() => getCurrentUser(), []))
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchCurrentUser()
      setIsLoggedIn(user ? true : false)
    }

    fetchInitialData()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isFetchingUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider