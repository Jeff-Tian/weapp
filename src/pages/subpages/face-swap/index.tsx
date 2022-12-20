import SinglePageLayout from "@/layout/single-page-layout";
import {gql, useMutation} from "@apollo/client";

const MUTATION = gql`
  mutation ($image1: Upload!, $image2: Upload!) {
    uploadImage(image1: $image1, image2: $image2) {
      filename
      data
    }
  }
`

const FaceSwap = () => {
  const [mutate] = useMutation(MUTATION)

  const onChange = ({target: {validity, files}})=> {
    if(validity.valid) {
      const [image1, image2] = files
      console.log('files = ', files);
      mutate({variables: {image1, image2}}).then(r => console.log('res = ', r)).catch(console.error)
    }
  }

  return <SinglePageLayout>
    <input type='file' multiple required onChange={onChange} />
  </SinglePageLayout>;
}


export default FaceSwap
