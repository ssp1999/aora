import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

export const usePicker = (mediaTypes) => {
  const [file, setFile] = useState(null)

  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setFile(result.assets[0])

      return result.assets[0]
    }

    return null
  }

  return { file, openPicker }
}
