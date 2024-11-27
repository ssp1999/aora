import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite'

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  plataform: 'com.ssp.aora',
  projectId: '6745715800181b925e6a',
  databaseId: '67457327002337d95a2d',
  userCollectionId: '67457361002a3ba80f68',
  videoCollectionId: '6745736a001875007dd6',
  storageId: '6745754b003416462472'
}

const {
  endpoint,
  plataform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = appWriteConfig

const client = new Client()

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(plataform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
      ['role:guest']
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        account_id: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser

  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('account_id', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]

  } catch (error) {
    console.log(error)
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session

  } catch (error) {
    throw new Error(error.message)
  }
}

export const getAllVideos = async () => {
  try {
    const videos = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt')]
    )

    return videos.documents
  } catch (error) {
    throw new Error(error.message)
  }
}

export const searchVideos = async (query) => {
  try {
    const videos = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title', query)]
    )

    return videos.documents
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getUserVideos = async (userId) => {
  try {
    const videos = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
    )

    return videos.documents
  } catch (error) {
    throw new Error(error.message)
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getFilePreview = (fileId, type) => {
  let fileUrl

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
    } else {
      throw new Error('Invalid file type')
    }

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    throw new Error(error.message)
  }
}

export const uploadFile = async (file, type) => {
  if (!file) return

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)

    return fileUrl
  } catch (error) {
    throw new Error(error.message)
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    const newPost = await databases.createDocument(
      databaseId, videoCollectionId, ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      creator: form.userId
    })

    return newPost
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deletePost = async (postId) => {
  try {
    await databases.deleteDocument(databaseId, videoCollectionId, postId)
  } catch (error) {
    throw new Error(error.message)
  }
}