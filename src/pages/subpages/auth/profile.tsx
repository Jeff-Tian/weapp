import {AtButton, AtDivider, AtForm, AtInput} from "taro-ui";
import Taro, {ENV_TYPE} from "@tarojs/taro";
import SinglePageLayout from "@/layout/single-page-layout";
import {useEffect, useState} from "react";
import {WeappLoginStatus} from "@/components/LoginStatus/weapp";
import {WebLoginStatus} from "@/components/LoginStatus/web";

import {authing, getUserInfo} from "@/common/login";
import {User} from "@authing/guard-react";
import {StorageKeys} from "@/common/constants";
import {loginByQrCode} from "@/services/zhihu";
import {copyCookieToClipboard} from "@/api/user-service";

import {Image, View} from "@tarojs/components";
import RichModal from "@/components/RichModal";
import './profile.styl'

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    getUserInfo().then(setUserInfo)
  }, [])

  const [zhihuLoginQRCode, setZhihuLoginQRCode] = useState('')
  const [richModalTitle, setRichModalTitle] = useState('')
  const [saveQR, setSaveQR] = useState<Function | null>(null)
  const [isRichModalOpen, setIsRichModalOpen] = useState(false)

  return <SinglePageLayout>
    {Taro.getEnv() === ENV_TYPE.WEAPP ? <WeappLoginStatus /> : <WebLoginStatus />}

    <AtDivider />
    <AtForm>
      <AtInput name='createdAt' title='注册日期' type='text' placeholder='请输入注册日期' value={userInfo?.createdAt} />
      <AtInput name='phone' title='手机号' type='text' placeholder='请输入手机号' value={userInfo?.phone} />
      <AtInput name='email' title='邮箱' type='text' placeholder='请输入邮箱' value={userInfo?.email} />
      <AtDivider />
      <AtInput name='username' title='用户名' type='text' placeholder='请输入用户名' value={userInfo?.username} />
      <AtInput name='name' title='姓名' type='text' placeholder='请输入姓名' value={userInfo?.name} />
      <AtInput name='nickname' title='昵称' type='text' placeholder='请输入昵称' value={userInfo?.nickname} />
      <AtInput name='address' title='地址' type='text' placeholder='请输入地址' value={userInfo?.address} />
      <AtInput name='gender' title='性别' type='text' placeholder='请输入性别' value={userInfo?.gender} />
      <AtInput name='birthday' title='生日' type='text' placeholder='请输入生日' value={userInfo?.birthdate} />
      <AtInput name='company' title='公司' type='text' placeholder='请输入公司' value={userInfo?.company} />
    </AtForm>
    <AtDivider />
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
          }).catch((error) => {
            console.error('跳转到个人中心失败', error);
          });
        })
      } else {
        loginByQrCode({setIsRichModalOpen, setZhihuLoginQRCode, setRichModalTitle, setSaveQR})
      }
    }}
    >绑定知乎账号</AtButton>
    <AtDivider></AtDivider>
    <AtButton onClick={() => {
      authing.logout();
      Taro.reLaunch({url: '/pages/yuque/index'})
    }}
      type='secondary'
    >退出登录</AtButton>


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

  </SinglePageLayout>
}

export default Profile;
