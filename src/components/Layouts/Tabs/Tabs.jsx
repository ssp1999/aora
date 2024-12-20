import { Tabs } from 'expo-router'
import { icons } from '@/constants'
import TabIcon from './components/TabIcon'

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            paddingTop: 6,
            height: 64,
          }
        }}
      >
        <Tabs.Screen name='home' options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.home}
              color={color}
            />
          )
        }} />
        <Tabs.Screen name='create' options={{
          title: 'Upload video',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
            />
          )
        }} />
        <Tabs.Screen name='profile' options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
            />
          )
        }} />
      </Tabs>
    </>
  )
}

export default TabsLayout