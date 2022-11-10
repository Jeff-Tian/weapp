import {useState} from "react";
import Taro from "@tarojs/taro";
import {StorageKeys} from "@/common/constants";
import {Image, View} from "@tarojs/components";
import {AtDrawer, AtNavBar} from "taro-ui";
import {loginByQrCode} from "@/services/zhihu";
import {getCurrentPageUrl} from "@/common/helpers";
import {drawerItems, onDrawerItemClick} from "@/layout/drawer-items";
import RichModal from "@/components/RichModal";
import {client} from "@/apollo-client";
import {gql} from "@apollo/client";

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

export const HighLevel = () => {
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
            Taro.navigateTo({url: '/pages/subpages/auth/profile'}).then(() => {
              console.log('跳转到个人中心成功');
            }).catch((error) => {
              console.error('跳转到个人中心失败', error);
            });
          })
        } else {
          loginByQrCode({setIsRichModalOpen, setZhihuLoginQRCode, setRichModalTitle, setSaveQR})
        }
      }}
      onClickLeftIcon={() => {
        const path = getCurrentPageUrl(Taro.getCurrentInstance().router)

        Taro.setClipboardData({data: `${path}`}).then(() =>
          Taro.showToast({
            title: `${path} 已复制`,
            icon: 'success',
          })
        ).catch(err => Taro.showToast({
          title: `${path} 复制失败：${err}`,
          icon: 'error'
        }))
      }}
      color='#000'
      title='哈德韦'
      leftText='复制本页链接'
      leftIconType='link'
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
