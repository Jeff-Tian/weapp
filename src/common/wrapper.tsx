import Taro from "@tarojs/taro";

const Wrapper = (WeappComponent, H5Component) => Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? WeappComponent : H5Component;

export default Wrapper;
