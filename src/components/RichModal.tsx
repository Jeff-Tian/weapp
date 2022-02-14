import {View, Image} from "@tarojs/components"
import {AtButton} from "taro-ui";
import {render} from '@tarojs/react'

const RichModal = ({isOpen, onConfirm, onCancel, title, children}) => {
  return isOpen ? <View>
    <View>{title}</View>
    {children}
    <View>
      <AtButton full={false} onClick={onConfirm}>确定</AtButton>
      <AtButton full={false} onClick={onCancel}>取消</AtButton>
    </View>
  </View> : null
}

export default RichModal

export const showRichModal = ({onConfirm, onCancel, title, children}) => {
  render(<RichModal isOpen onConfirm={onConfirm} onCancel={onCancel}
    title={title}
  >{children}</RichModal>, document.getElementById('rich-modal'))
}

export const showImageModal = ({onConfirm, onCancel, title, imageUrl}) => {
  showRichModal({onConfirm, onCancel, title, children: <Image src={imageUrl} />})
}

export const closeRichModal = () => {
  render(null, document.getElementById('rich-modal'))
}
