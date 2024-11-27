import * as Yup from 'yup'

const MAX_FILE_SIZE = 50 * 1024 * 1024
const SUPPORTED_VIDEO_FORMATS = ["video/mp4"]
const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"]

export const uploadVideoSchema = Yup.object().shape({
  title: Yup.string().required('Required title').min(4, 'At least 4 characters'),
  video: Yup.object()
    .required("Required video")
    .test("fileSize", "Video size must be less than 50MB", (file) => {
      return file && file.fileSize <= MAX_FILE_SIZE
    })
    .test("fileType", "Unsupported video format", (file) => {
      return file && SUPPORTED_VIDEO_FORMATS.includes(file.mimeType)
    }),
  thumbnail: Yup.object()
    .required("Required thumbnail image")
    .test("fileSize", "Image size must be less than 50MB", (file) => {
      return file && file.fileSize <= MAX_FILE_SIZE
    })
    .test("fileType", "Unsupported image format", (file) => {
      return file && SUPPORTED_IMAGE_FORMATS.includes(file.mimeType)
    }),
})