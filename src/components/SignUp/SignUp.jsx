import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/common/FormField/FormField'
import CustomButton from '@/components/common/CustomButton/CustomButton'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import { Formik } from 'formik'
import { signUpSchema } from '@/validation/signUp'

const SignUp = () => {
  const form = {
    username: '',
    email: '',
    password: ''
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true)

    try {
      const result = await createUser(values.email, values.password, values.username)
      setUser(result)
      setIsLoggedIn(true)

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
            Sign up to Aora
          </Text>

          <Formik
            initialValues={form}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <FormField
                  title='Username'
                  otherStyles='mt-10'
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                />

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
                  title='Sign Up'
                  handlePress={handleSubmit}
                  containerStyles='mt-7'
                  disabled={isSubmitting}
                  showLoader={isSubmiting}
                />
              </View>
            )}
          </Formik>

          <View className='justify-center pt-5 flex-row'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?{' '}
            </Text>

            <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>
              Sign In
            </Link>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp