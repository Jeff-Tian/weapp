import {useState} from "react";
import {View} from "@tarojs/components";
import {AtButton, AtTextarea} from "taro-ui";

export const Prompt = ({isOpen, onConfirm}) => {
  const [content, setContent] = useState('')

  return isOpen ? <View className='prompt'>
    <View>请输入要排序的数字集合，一行一个。</View>
    <View>
      <AtTextarea value={content} onChange={(inputs) => {
        setContent(inputs)
      }} focus className='inputs' count={false} autoFocus
      />
    </View>
    <View>
      <AtButton full={false} onClick={() => onConfirm(content)}>确定</AtButton>
    </View>
  </View> : null
}
