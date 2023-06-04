import {AtButton, AtDivider, AtForm, AtInput, AtTextarea} from "taro-ui";
import Taro, {ENV_TYPE} from "@tarojs/taro";
import SinglePageLayout from "@/layout/single-page-layout";
import {useEffect, useState} from "react";
import {WeappLoginStatus} from "@/components/LoginStatus/weapp";
import {WebLoginStatus} from "@/components/LoginStatus/web";

import {getUserInfo, logout} from "@/common/login";
import {User} from "@authing/guard-react";
import MyZhihu from "@/components/zhihu/MyZhihu";
import {Button, Label, RootPortal, View} from "@tarojs/components";
import {getToken} from "@/common/token";
import JsonViewer, {JsonViewerWrapper} from "@/components/JsonViewer";
import {parseJwt} from "@/functions/jwt";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo().then(setUserInfo);
  }, []);

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  if (Taro.getEnv() === ENV_TYPE.WEAPP && userInfo?.id !== '6204de0a49c31874b97d470b') {
    return <SinglePageLayout>
      <View>仅网页版支持</View>
    </SinglePageLayout>
  }

  return (
    <SinglePageLayout>
      {Taro.getEnv() === ENV_TYPE.WEAPP ? (
        <WeappLoginStatus />
      ) : (
        <WebLoginStatus />
      )}

      <AtDivider />
      <AtForm>
        <AtInput
          name='createdAt'
          title='注册日期'
          type='text'
          placeholder='请输入注册日期'
          value={userInfo?.createdAt ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='phone'
          title='手机号'
          type='text'
          placeholder='请输入手机号'
          value={userInfo?.phone ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='email'
          title='邮箱'
          type='text'
          placeholder='请输入邮箱'
          value={userInfo?.email ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtDivider />
        <AtInput
          name='username'
          title='用户名'
          type='text'
          placeholder='请输入用户名'
          value={userInfo?.username ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='name'
          title='姓名'
          type='text'
          placeholder='请输入姓名'
          value={userInfo?.name ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='nickname'
          title='昵称'
          type='text'
          placeholder='请输入昵称'
          value={userInfo?.nickname ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='address'
          title='地址'
          type='text'
          placeholder='请输入地址'
          value={userInfo?.address ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='gender'
          title='性别'
          type='text'
          placeholder='请输入性别'
          value={userInfo?.gender ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='birthday'
          title='生日'
          type='text'
          placeholder='请输入生日'
          value={userInfo?.birthdate ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <AtInput
          name='company'
          title='公司'
          type='text'
          placeholder='请输入公司'
          value={userInfo?.company ?? ""}
          disabled
          onChange={() => {
          }}
        />
        <Label>个人令牌：</Label>
        {token && <AtTextarea value={token} onChange={() => {
        }} maxLength={10000} placeholder='个人令牌' height={500} onFocus={() => {
          Taro.setClipboardData({data: `${token}`})
            .then(() =>
              Taro.showToast({
                title: `已复制`,
                icon: "success",
              })
            )
            .catch((err) =>
              Taro.showToast({
                title: `复制失败：${err}`,
                icon: "error",
              })
            );

          setShowTokenModal(true);
        }}
        />}
      </AtForm>
      <AtDivider />

      {showTokenModal && <RootPortal enable>
        <JsonViewerWrapper json={parseJwt(token)} initialViewMode='parsed' />
        <Button onClick={()=>setShowTokenModal(false)}>关闭</Button>
      </RootPortal>}

      {userInfo && <MyZhihu />}

      <AtDivider></AtDivider>
      <AtButton onClick={logout} type='secondary'>
        退出登录
      </AtButton>
    </SinglePageLayout>
  );
};

export default Profile;
