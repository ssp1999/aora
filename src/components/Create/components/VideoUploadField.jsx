import { Text, TouchableOpacity, View, Image } from 'react-native'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEffect, useRef } from 'react'

const VideoUploadField = ({ video, error, handlePicker, setFieldValue, setFieldTouched, touched }) => {
  const onPress = async () => {
    const file = await handlePicker()
    setFieldValue('video', file || null)
    if (!file) setFieldTouched('video', true)
  }

  const videoRef = useRef(null)
  const player = useVideoPlayer(video)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playing = false
    }
  }, [videoRef])

  return (
    <View className='mt-7 space-y-2'>
      <Text className='text-base text-gray-100 font-pmedium'>
        Upload video
      </Text>

      <TouchableOpacity onPress={onPress}>
        {video ? (
          <View className={`w-full h-64 rounded-2xl ${touched && error ? 'border-2 border-red-400' : ''}`}>
            <VideoView
              ref={videoRef}
              style={{ width: '100%', height: '100%' }}
              player={player}
              contentFit
            />
          </View>
        ) : (
          <View className={`w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center ${touched && error ? 'border-2 border-red-400' : ''}`}>
            <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
              <Image
                source={icons.upload}
                resizeMode='contain'
                className='w-1/2 h-1/2'
              />
            </View>
          </View>
        )}
        {touched && error ? (
          <Text className='text-red-400 text-sm mt-1 ml-4'>{error}</Text>
        ) : null}
      </TouchableOpacity>
    </View>
  )
}

export default VideoUploadField