import Taro from "@tarojs/taro";
import util from "util";

export const naiveErrorHandler = error => Taro.showModal({title: error.message, content: util.inspect(error)})
