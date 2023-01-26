import {AtForm, AtInput} from "taro-ui";

const JsonViewer = ({json}) => {
  return <AtForm>
    {
      Object.keys(json).map(key => {
        return <AtInput name={key} title={key} type='text' placeholder={key} value={json[key]} disabled />
      })
    }
  </AtForm>
}

export default JsonViewer
