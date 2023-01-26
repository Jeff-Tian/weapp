import {AtForm, AtInput} from "taro-ui";
import {View} from "@tarojs/components";

const JsonViewer = ({json}) => {
  return <AtForm>
    {!json && <View>{`${json}`}</View>}
    {
      json && Object.keys(json).map(key => {
        return <AtInput name={key} title={key} type='text' placeholder={key} value={json[key]} disabled />
      })
    }
  </AtForm>
}

export default JsonViewer
