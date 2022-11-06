import Taro from '@tarojs/taro'
import {AtDrawer, AtNavBar} from "taro-ui"
import {View, Image} from "@tarojs/components"
import {useState} from "react"
import {loginByQrCode} from "@/services/zhihu"
import {StorageKeys} from "@/common/constants"
import {gql} from '@apollo/client'
import {client} from "@/apollo-client";

import {drawerItems, onDrawerItemClick} from "./drawer-items"
import HardwayTabs from './tabs'
import '../components/rich-modal.styl'
import RichModal from "../components/RichModal";

const COPY_TO_CLIPBOARD = gql`
mutation CopyToClipboard($clipboard: ClipboardInput!) {
  copyToClipboard(clipboard: $clipboard) {
    key
    value
  }
}
`

const copyCookieToClipboard = (userId: number, cookieData: string) => {
  client.mutate({
    mutation: COPY_TO_CLIPBOARD, variables:
      {
        clipboard: {
          key: `zhihu-user-cookie-${userId}`,
          value: JSON.stringify(cookieData)
        }
      }
  }).then(console.log).catch(console.error)
}

const HighLevel = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [isRichModalOpen, setIsRichModalOpen] = useState(false)
  const [zhihuLoginQRCode, setZhihuLoginQRCode] = useState('')
  const [richModalTitle, setRichModalTitle] = useState('')
  const [saveQR, setSaveQR] = useState(null)

  const zhihuUserInfo = Taro.getStorageSync(StorageKeys.zhihuUserInfo)
  return <View>
    <AtNavBar
      onClickRgIconSt={() => {
        setShowDrawer(true)
      }}
      onClickRgIconNd={() => {
        if (zhihuUserInfo) {
          console.log('知乎用户信息：', zhihuUserInfo);

          console.log('知乎 cookie: ', Taro.getStorageSync(StorageKeys.zhihuCookie));

          copyCookieToClipboard(zhihuUserInfo.user_id, JSON.stringify({data: Taro.getStorageSync(StorageKeys.zhihuCookie)}));

          Taro.showToast({
            title: '已经登录',
            icon: 'success',
            duration: 1000,
          }).then(() => {
            Taro.navigateTo({url: '/pages/subpages/auth/profile'});
          })
        } else {
          loginByQrCode({setIsRichModalOpen, setZhihuLoginQRCode, setRichModalTitle, setSaveQR})
        }
      }}
      onClickLeftIcon={() => {
      }}
      color='#000'
      title='哈德韦的个人小程序'
      // leftText='返回'
      // leftIconType='chevron-left'
      rightFirstIconType='bullet-list'
      rightSecondIconType={zhihuUserInfo ? {value: 'user', color: 'blue'} : 'user'}
    />

    <AtDrawer
      show={showDrawer}
      mask
      right
      onClose={() => setShowDrawer(false)}
      items={[...drawerItems.keys()]}
      onItemClick={onDrawerItemClick}
    />

    <View id='rich-modal'>
      <RichModal isOpen={isRichModalOpen} onConfirm={() => {
        setIsRichModalOpen(false)
        saveQR && saveQR()
      }} onCancel={() => {
        setIsRichModalOpen(false)
      }} title={richModalTitle}
      >
        <Image src={zhihuLoginQRCode}/>
      </RichModal>
    </View>
  </View>
}


const HardwayLayout = ({children}) => {
  return <View>
    <HighLevel/>
    <HardwayTabs>
      <View style={{minHeight: '1000px'}}>
        {children}
      </View>
    </HardwayTabs>
  </View>
}

export default HardwayLayout
