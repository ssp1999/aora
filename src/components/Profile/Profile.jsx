import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import { getUserVideos, signOut } from '@/lib/appwrite'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/common/VideoCard/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { icons } from '@/constants'
import InfoBox from './components/InfoBox'
import { router } from 'expo-router'
import { useCallback, useEffect } from 'react'

const Profile = () => {
  const { user, setUser, setIsLoggedIn, shouldRefetch, setShouldRefetch } = useGlobalContext()
  const { data: videos, fetchData } = useAppwrite(useCallback(() => getUserVideos(user.$id), [user.$id]))

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos uploaded yet"
            subtitle="Let's get started and share your creativity!"
          />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                resizeMode='cover'
                className='w-[90%] h-[90%] rounded-lg'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row'>
              <InfoBox
                title={videos.length || 0}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />

              <InfoBox
                title='1.2k'
                subtitle='Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            showActionsMenu={user.$id === item.creator.$id}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile