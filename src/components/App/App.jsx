import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { images } from '@/constants'
import CustomButton from '@/components/common/CustomButton/CustomButton'
import { useGlobalContext } from '@/context/GlobalProvider'

const App = () => {
  const { isFetchingUser, isLoggedIn } = useGlobalContext()

  return !isFetchingUser && isLoggedIn ? (
    <Redirect href='/home' />
  ) : (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[130px] h-[84px]'
          />
          <Image
            source={images.cards}
            resizeMode='contain'
            className='max-w-[380px] w-full h-[300px]'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless{'\n'} Possibilities with{' '}<Text className='text-secondary-200'>Aora</Text>
            </Text>

            <Image
              source={images.path}
              resizeMode='contain'
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where creativity meets inovation: embark on a journey of limitlesss exploration with Aora
          </Text>

          <CustomButton
            title='Continue with Email'
            handlePress={() => router.push('/sign-in')}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default App
