import SinglePageLayout from "@/layout/single-page-layout";
import {gql, useMutation} from "@apollo/client";
import {useState} from "react";
import {AtAvatar, AtButton} from "taro-ui";
import Taro from "@tarojs/taro";

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
  const chooseImage = () => {
    Taro.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then((res) => {
      console.log('files = , ', res);
      const [image1, image2] = res.tempFiles
      mutate({variables: {image1: image1.originalFileObj, image2: image2.originalFileObj}}).then(r => {
        console.log('res = ', r);
        setResult(r.data.uploadImage)
      }).catch(console.error)
    });
  };

  return <SinglePageLayout>
    <AtButton onClick={chooseImage}>选择照片</AtButton>
    {result && <AtAvatar image={`data:${result.mimetype};base64,${result.data}`} size='large' />}
  </SinglePageLayout>;
}


export default FaceSwap
