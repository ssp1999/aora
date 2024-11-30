import { useLocalSearchParams } from "expo-router"
import UploadVideoForm from "../../UploadVideoForm/UploadVideoForm"

const Update = () => {
  const { id } = useLocalSearchParams()

  return (
    <UploadVideoForm id={id} update={true} />
  )
}

export default Update