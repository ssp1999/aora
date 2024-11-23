import { icons } from '../constants'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const ThumbnailImageField = ({ image, error, handlePicker, setFieldValue }) => {
  const onPress = async () => {
    const file = await handlePicker()
    setFieldValue('thumbnail', file || null)
  }

  return (
    <View className='mt-7 space-y-2'>
      <Text className='text-base text-gray-100 font-pmedium'>
        Thumbnail Image
      </Text>

      <TouchableOpacity onPress={onPress}>
        {image ? (
          <Image
            source={{ uri: image.uri }}
            resizeMode='cover'
            className='w-full h-64 rounded-2xl'
          />
        ) : (
          <View
            className={`w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 ${error ? 'border-red-400' : 'border-black-200'} flex-row space-x-2`}
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
        {error && <Text className='text-red-400 text-sm mt-1 ml-4'>{error}</Text>}
      </TouchableOpacity>
    </View>
  )
}

export default ThumbnailImageField