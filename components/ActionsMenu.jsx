import { Alert, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { deletePost } from '../lib/appwrite'
import { useGlobalContext } from '../context/GlobalProvider'

const ActionsMenu = ({ videoId }) => {
  const { showActionSheetWithOptions } = useActionSheet()
  const { setShouldRefetch } = useGlobalContext()

  const handleDelete = async () => {
    try {
      await deletePost(videoId)
      setShouldRefetch(true)
      Alert.alert('Success', 'Post deleted successfully')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const onPress = () => {
    const options = ['Delete', 'Cancel']
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 2

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case destructiveButtonIndex:
          handleDelete()
          break

        case cancelButtonIndex:
        // Canceled
      }
    })
  }
  return (
    <TouchableOpacity
      className='pt-2'
      onPress={onPress}
    >
      <Image
        source={icons.menu}
        resizeMode='contain'
        className='w-5 h-5'
      />
    </TouchableOpacity>
  )
}

export default ActionsMenu