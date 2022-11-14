import {AtAvatar, AtGrid} from "taro-ui";
import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";

const Profile = () => {
  return <View><AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
    <AtGrid data={[{image: '', value: '退出登录'}]} onClick={(_item, index) => {
      if (index === 0) {
        Taro.clearStorage().then(() => {
          Taro.reLaunch({url: 'pages/yuque/index'})
        })
      }
    }
    }
    />
  </View>
}

export default Profile;
