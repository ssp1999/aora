import { icons } from '@/constants'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { usePicker } from '@/hooks/usePicker'
import { useEffect } from 'react'

const ThumbnailImageField = ({ thumbnailURL, error, touched, setFieldValue, setFieldTouched, validateForm }) => {
  const { openPicker } = usePicker(['images'])
  const onPress = async () => {
    const file = await openPicker()

    await Promise.all([
      setFieldValue('thumbnail', file || null, false),
      setFieldValue('thumbnailURL', file.uri || null, false),
      setFieldTouched('thumbnail', true, false),
      setFieldTouched('thumbnailURL', true, false)
    ])
  }

  useEffect(() => {
    // Delays the setting of touched fields to ensure that the field value has been updated before validation is triggered
    setTimeout(() => {
      validateForm()
    }, 0)
  }, [thumbnailURL])

  return (
    <View className='mt-7 space-y-2'>
      <Text className='text-base text-gray-100 font-pmedium'>
        Thumbnail Image
      </Text>

      <TouchableOpacity onPress={onPress}>
        {thumbnailURL ? (
          <Image
            source={{ uri: thumbnailURL }}
            resizeMode='cover'
            className={`w-full h-64 rounded-2xl ${touched && error ? 'border-2 border-red-400' : ''}`}
          />
        ) : (
          <View
            className={`w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 ${touched && error ? 'border-red-400' : 'border-black-200'} flex-row space-x-2`}
          >
            <Image
              source={icons.upload}
              resizeMode='contain'
              className='w-5 h-5'
            />

            <Text className='text-sm text-gray-100 font-pmedium ml-2'>
              Choose a file
            </Text>
          </View>
        )}
        {touched && error ? (
          <Text className='text-red-400 text-sm mt-1 ml-4'>{error}</Text>
        ) : null}
      </TouchableOpacity>
    </View>
  )
}

export default ThumbnailImageField