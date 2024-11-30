import { Alert, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { deleteVideo } from '@/lib/appwrite'
import { router } from 'expo-router'

const ActionsMenu = ({ videoId, fetchVideos }) => {
  const { showActionSheetWithOptions } = useActionSheet()

  const handleDelete = async () => {
    try {
      await deleteVideo(videoId)
      Alert.alert('Success', 'Video deleted successfully')
      await fetchVideos()
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const onPress = () => {
    const options = ['Delete', 'Update', 'Cancel']
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 2

    showActionSheetWithOptions({
      options,
      containerStyle: {
        backgroundColor: '#161622',
      },
      textStyle: {
        color: '#CDCDE0',
      },
      cancelButtonTintColor: '#A8A8B3',
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case destructiveButtonIndex:
          handleDelete()
          break

        case 1:
          router.push(`videos/${videoId}`)
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