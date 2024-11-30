import { icons } from '@/constants'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { usePicker } from '@/hooks/usePicker'

const ThumbnailImageField = ({ image, error, setFieldValue, setFieldTouched, touched }) => {
  const { openPicker } = usePicker(['images'])
  const onPress = async () => {
    const file = await openPicker()
    setFieldValue('thumbnail', file || null)
    if (!file) setFieldTouched('thumbnail', true)
  }

  return (
    <View className='mt-7 space-y-2'>
      <Text className='text-base text-gray-100 font-pmedium'>
        Thumbnail Image
      </Text>

      <TouchableOpacity onPress={onPress}>
        {image ? (
          <Image
            source={{ uri: image.uri || image }}
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