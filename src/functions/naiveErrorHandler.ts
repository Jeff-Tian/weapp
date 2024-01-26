import Taro from "@tarojs/taro";
import util from "util";

export const naiveErrorHandler = error => {
  console.error('naiveErrorHandler met: ', error)
  if (error.code === 4021) {
    return;
  }

  return Taro.showModal({title: error.message || error.errMsg || '未知错误', content: util.inspect(error)});
}
