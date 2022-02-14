import Taro from '@tarojs/taro'
import {AtDrawer, AtNavBar} from "taro-ui"
import {View, Image} from "@tarojs/components"
import {useState} from "react"
import {loginByQrCode} from "../../services/zhihu"
import {drawerItems, onDrawerItemClick} from "./drawer-items"
import {StorageKeys} from "../../common/constants"
import HardwayTabs from './tabs'
import '../../common/rich-modal.styl'
import RichModal from "../../common/RichModal";

const HardwayLayout = (props) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [isRichModalOpen, setIsRichModalOpen] = useState(false)
  const [zhihuLoginQRCode, setZhihuLoginQRCode] = useState('')
  const [richModalTitle, setRichModalTitle] = useState('')
  const [saveQR, setSaveQR] = useState(null)

  const zhihuUserInfo = Taro.getStorageSync(StorageKeys.zhihuUserInfo)

  return <HardwayTabs><View style={{minHeight: '1000px'}}>
    <AtNavBar
      onClickRgIconSt={() => {
        setShowDrawer(true)
      }}
      onClickRgIconNd={() => {
        if (zhihuUserInfo) {
          Taro.showToast({
            title: '已经登录',
            icon: 'success',
            duration: 1000
          })
        } else {
          loginByQrCode({setIsRichModalOpen, setZhihuLoginQRCode, setRichModalTitle, setSaveQR}).then()
        }
      }}
      onClickLeftIcon={() => {
      }}
      color='#000'
      title='哈德韦的个人小程序'
      leftText='返回'
      leftIconType='chevron-left'
      rightFirstIconType='bullet-list'
      rightSecondIconType={zhihuUserInfo ? {value: 'user', color: 'blue'} : 'user'}
    />

    <View id='rich-modal'><RichModal isOpen={isRichModalOpen} onConfirm={() => {
      setIsRichModalOpen(false)
      saveQR && saveQR()
    }} onCancel={() => {
      setIsRichModalOpen(false)
    }
    }
      title={richModalTitle}
    >
      <Image src={zhihuLoginQRCode} />
    </RichModal></View>

    {props.children}

    <AtDrawer
      show={showDrawer}
      mask
      right
      onClose={() => setShowDrawer(false)}
      items={[...drawerItems.keys()]}
      onItemClick={onDrawerItemClick}
    />
  </View></HardwayTabs>
}

export default HardwayLayout
