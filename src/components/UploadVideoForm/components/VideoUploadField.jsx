import { Text, TouchableOpacity, View, Image } from 'react-native'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEffect, useRef } from 'react'
import { usePicker } from '@/hooks/usePicker'

const VideoUploadField = ({ video, error, setFieldValue, setFieldTouched, touched, videoURL, setVideoURL }) => {
  const { openPicker } = usePicker(['videos'])
  const onPress = async () => {
    const file = await openPicker()
    setFieldValue('video', file || null)
    setVideoURL(file.uri || null)
    if (!file) setFieldTouched('video', true)
  }

  const videoPlayerRef = useRef(null)
  const player = useVideoPlayer(null)

  useEffect(() => {
    if (videoURL) {
      player.replace(videoURL)
    }
  }, [videoURL])

  const clearVideo = () => {
    setVideoURL(null)
    setFieldValue('video', null)
  }

  return (
    <View className='mt-7 space-y-2'>
      <Text className='text-base text-gray-100 font-pmedium'>
        Upload video
      </Text>

      <TouchableOpacity onPress={onPress}>
        {videoURL ? (
          <View className={`w-full h-64 rounded-2xl ${touched && error ? 'border-2 border-red-400' : ''}`}>
            <VideoView
              ref={videoPlayerRef}
              style={{ width: '100%', height: '100%' }}
              player={player}
              contentFit
            />
            <TouchableOpacity
              className='absolute p-2 right-0 top-0'
              onPress={() => clearVideo()}
            >
              <Image
                source={icons.remove}
                resizeMode='contain'
                className='w-8 h-8'
              />
            </TouchableOpacity>
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