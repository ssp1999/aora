import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

export default function App() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-3xl font-pblack'>aora</Text>
      <StatusBar style='auto' />
      <Link href='/home' className='text-secondary'>go to home</Link>
    </View>
  )
}
