import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Formik } from 'formik'
import { signInSchema } from '../../validation/signIn'

const SignIn = () => {
  const form = {
    email: '',
    password: ''
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true)

    try {
      await signIn(values.email, values.password)
      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert('Success', 'User signed in successfully')

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      resetForm()
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Log in to Aora
          </Text>

          <Formik
            initialValues={form}
            validationSchema={signInSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <FormField
                  title='Email'
                  otherStyles='mt-7'
                  keyboardType='email-address'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                />

                <FormField
                  title='Password'
                  otherStyles='mt-7'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  secureTextEntry
                  touched={touched.password}
                />

                <CustomButton
                  title='Sign In'
                  handlePress={handleSubmit}
                  containerStyles='mt-7'
                  isLoading={isSubmitting}
                />
              </View>
            )}
          </Formik>

          <View className='justify-center pt-5 flex-row'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have account?{' '}
            </Text>

            <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>
              Sign Up
            </Link>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn