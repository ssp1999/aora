import { View, Text, Image } from 'react-native'
import { icons } from '../constants'
import { useCallback, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import ActionsMenu from './ActionsMenu'

const VideoCard = ({ video: { $id, title, thumbnail, video, creator: { username, avatar } }, showActionsMenu = false }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)
  const player = useVideoPlayer(video)

  const startVideo = useCallback(() => {
    setIsPlaying(true)
    player.loop = false
    player.play()
  })

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>

          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text className='text-white font-psemibold text-sm' numberOfLines={1}>
              {title}
            </Text>

            <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>

        {showActionsMenu && (
          <ActionsMenu
            videoId={$id}
          />
        )}

      </View>

      {isPlaying ? (
        <View className='w-full h-60 rounded-xl mt-3'>
          <VideoView
            ref={videoRef}
            style={{ width: '100%', height: '100%' }}
            player={player}
            contentFit
            allowsFullscreen
          />
        </View>
      ) : (
        <TouchableOpacity
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
          activeOpacity={0.7}
          onPress={startVideo}
        >
          <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard