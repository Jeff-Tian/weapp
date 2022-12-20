import SinglePageLayout from "@/layout/single-page-layout";
import {gql, useMutation} from "@apollo/client";
import {useState} from "react";
import {AtAvatar} from "taro-ui";

const MUTATION = gql`
  mutation ($image1: Upload!, $image2: Upload!) {
    uploadImage(image1: $image1, image2: $image2) {
      filename
      data
      mimetype
    }
  }
`

const FaceSwap = () => {
  const [mutate] = useMutation(MUTATION)
  const [result, setResult] = useState<any>(null)

  const onChange = ({target: {validity, files}})=> {
    if(validity.valid) {
      const [image1, image2] = files
      mutate({variables: {image1, image2}}).then(r => {
        console.log('res = ', r);
        setResult(r.data.uploadImage)
      }).catch(console.error)
    }
  }

  return <SinglePageLayout>
    <input type='file' multiple required onChange={onChange} />
    {result && <AtAvatar image={`data:${result.mimetype};base64,${result.data}`} size='large' />}
  </SinglePageLayout>;
}


export default FaceSwap
