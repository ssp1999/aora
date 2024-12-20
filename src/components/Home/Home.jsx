import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/common/SearchInput/SearchInput'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getAllVideos } from '@/lib/appwrite'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/common/VideoCard/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import LatestVideos from '@/components/LatestVideos/LatestVideos'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useFocusEffect } from 'expo-router'

const Home = () => {
  const { user } = useGlobalContext()
  const { data: videos, setData: setVideos, fetchData: fetchVideos, isFetching: isFetchingVideos } = useAppwrite(useCallback(() => getAllVideos(), []))
  const [latestVideos, setLatestVideos] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const videoPlayerRef = useRef(null)
  const player = useVideoPlayer(null, (player) => {
    player.loop = true
  })

  const handleOnRefresh = useCallback(async () => {
    setIsRefreshing(true)

    setVideos([])
    await fetchVideos()

    setIsRefreshing(false)
  }, [fetchVideos])

  const startVideo = useCallback((videoSource) => {
    player.replace(videoSource)
    player.play()
    videoPlayerRef.current.enterFullscreen()
  }, [])

  const handleOnFullscreenExit = useCallback(() => {
    player.replay()
    player.pause()
    player.replace(null)
  }, [player])

  useEffect(() => {
    setLatestVideos(videos.slice(0, 7))
  }, [videos])

  useFocusEffect(
    useCallback(() => {
      const fetchInitialData = async () => {
        if (videos.length > 0) {
          setVideos([])
        }

        await fetchVideos()
      }

      fetchInitialData()
    }, [])
  )

  return (
    <SafeAreaView className='bg-primary h-full'>
      <VideoView
        player={player}
        ref={videoPlayerRef}
        style={{ display: 'none' }}
        onFullscreenExit={handleOnFullscreenExit}
      />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={() => !isFetchingVideos || !isRefreshing ? (
          <EmptyState
            title='No videos found'
            subtitle='Be the first one to upload a video'
          />
        ) : null}
        ListHeaderComponent={useCallback(() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome back,
                </Text>

                <Text className='text-2xl font-psemibold text-white'>
                  {user?.username}
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  className='w-9 h-10'
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>
              <LatestVideos
                latestVideos={latestVideos}
                startVideo={startVideo}
              />
            </View>
          </View>
        ), [latestVideos])}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home