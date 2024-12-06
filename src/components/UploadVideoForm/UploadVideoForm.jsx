import { View, Text, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/common/FormField/FormField'
import { useCallback, useEffect, useRef, useState } from 'react'
import CustomButton from '@/components/common/CustomButton/CustomButton'
import { router, useFocusEffect } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { Formik } from 'formik'
import VideoUploadField from './components/VideoUploadField'
import ThumbnailImageField from './components/ThumbnailImageField'
import { uploadVideoSchema } from '@/validation/uploadVideo'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '@/hooks/useAppwrite'
import { getVideo, updateVideo } from '../../lib/appwrite'

const UploadVideoForm = ({ id, update = false }) => {
  const { user } = useGlobalContext()
  const [isSubmiting, setIsSubmiting] = useState(false)

  const formikRef = useRef(null)

  const { data, fetchData } = useAppwrite(useCallback(() => getVideo(id), []))

  useEffect(() => {
    const fetchInitialData = async () => {
      if (id) {
        await fetchData()
      }
    }

    fetchInitialData()
  }, [])

  const form = {
    title: data?.title || '',
    video: null,
    thumbnail: null,
    videoURL: data?.video || null,
    thumbnailURL: data?.thumbnail || null,
  }

  const getChangedValues = (initialValues, currentValues) => {
    const changedValues = {}
    for (const key in currentValues) {
      if (initialValues[key] !== currentValues[key]) {
        changedValues[key] = currentValues[key]
      }
    }
    return changedValues
  }

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmiting(true)

    try {
      const changedValues = getChangedValues(form, values)

      if (Object.keys(changedValues).length === 0) return

      const successMessage = update ? 'Video updated successfully' : 'Video uploaded successfully'
      const redirectRoute = update ? '/profile' : '/home'

      if (update) {
        await updateVideo(id, changedValues)
      } else {
        await createVideo({ ...values, userId: user.$id })
      }

      Alert.alert('Success', successMessage)
      router.push(redirectRoute)

    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      resetForm()
      setIsSubmiting(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (formikRef.current) {
        formikRef.current.resetForm()
      }
    }, [])
  )

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-white text-2xl font-psemibold'>
          {update ? 'Update Video' : 'Upload Video'}
        </Text>

        <Formik
          innerRef={formikRef}
          initialValues={form}
          enableReinitialize
          validationSchema={uploadVideoSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, dirty, setFieldValue, setFieldTouched, validateForm }) => (
            <View>
              <FormField
                title='Video Title'
                placeholder='Give your video a catch title...'
                otherStyles='mt-10'
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                error={errors.title}
                touched={touched.title}
              />

              <ThumbnailImageField
                thumbnailURL={values.thumbnailURL}
                error={errors.thumbnail}
                touched={touched.thumbnail}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                validateForm={validateForm}
              />

              <VideoUploadField
                videoURL={values.videoURL}
                error={errors.video}
                touched={touched.video}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                validateForm={validateForm}
              />

              <CustomButton
                title='Submit & Publish'
                handlePress={handleSubmit}
                disabled={isSubmiting || !dirty}
                showLoader={isSubmiting}
                containerStyles='mt-8'
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UploadVideoForm