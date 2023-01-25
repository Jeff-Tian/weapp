import {copyCookieToClipboard} from "@/api/user-service";
import {StorageKeys} from "@/common/constants";
import {Image, View} from "@tarojs/components";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import {loginByQrCode} from "@/services/zhihu";
import RichModal from "@/components/RichModal";
import {useState} from "react";
import ZhihuCookie from "@/components/zhihu/ZhihuCookie";

const MyZhihu = () => {
  const [zhihuLoginQRCode, setZhihuLoginQRCode] = useState('')
  const [richModalTitle, setRichModalTitle] = useState('')
  const [saveQR, setSaveQR] = useState<Function | null>(null)
  const [isRichModalOpen, setIsRichModalOpen] = useState(false)

  return <View>
    <ZhihuCookie />
    <AtButton type='primary' onClick={() => {
      const zhihuUserInfo = Taro.getStorageSync(StorageKeys.zhihuUserInfo)
      if (zhihuUserInfo) {
        copyCookieToClipboard(zhihuUserInfo.user_id, JSON.stringify({data: Taro.getStorageSync(StorageKeys.zhihuCookie)}));

        Taro.showToast({
          title: '已经登录',
          icon: 'success',
          duration: 1000,
        }).then(() => {
          Taro.navigateTo({url: '/pages/subpages/auth/profile'}).then(() => {
            console.log('跳转到个人中心成功');
          }).catch((ex) => {
            console.error('跳转到个人中心失败', ex);
          });
        })
      } else {
        loginByQrCode({setIsRichModalOpen, setZhihuLoginQRCode, setRichModalTitle, setSaveQR})
      }
    }}
    >绑定或者重新绑定知乎账号</AtButton>
    <View id='rich-modal'>
      <RichModal isOpen={isRichModalOpen} onConfirm={() => {
        setIsRichModalOpen(false)
        saveQR && saveQR()
      }} onCancel={() => {
        setIsRichModalOpen(false)
      }} title={richModalTitle}
      >
        <Image src={zhihuLoginQRCode} />
      </RichModal>
    </View>
  </View>
}

export default MyZhihu
