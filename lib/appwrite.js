import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite'

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  plataform: 'com.ssp.aora',
  projectId: '67281f45001455da5284',
  databaseId: '672820ac0017f5446021',
  userCollectionId: '67282118003d13602125',
  videorCollectionId: '6728213a0038a13f3099',
  storageId: '672822a1001f563075b1'
}

const client = new Client()

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.plataform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
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
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
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
    throw new Error(error)
  }
}


