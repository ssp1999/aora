import { useCallback, useState } from "react"
import { Alert } from "react-native"

const useAppwrite = (fn) => {
  const [data, setData] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    try {
      const response = await fn()
      setData(response || data)
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsFetching(false)
    }
  }, [fn])

  return { data, setData, fetchData, isFetching }
}

export default useAppwrite