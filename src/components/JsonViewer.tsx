import {AtForm, AtInput} from "taro-ui";
import {View} from "@tarojs/components";

const JsonViewer = ({json}) => {
  return <AtForm>
    {!json && <View>{`${json}`}</View>}
    {
      json && Object.keys(json).map(key => {
        return <AtInput key={key} name={key} title={key} type='text' placeholder={key} value={json[key]} disabled
          onChange={() => {
                        }}
        />
      })
    }
  </AtForm>
}

export default JsonViewer
