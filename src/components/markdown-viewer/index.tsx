import Taro from "@tarojs/taro";
import WebMarkdownViewer from "./h5";
import WeappMarkdownViewer from "./weapp";

const MarkdownViewer = ({markdown}) => {
  return Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? <WeappMarkdownViewer markdown={markdown} /> :
    <WebMarkdownViewer markdown={markdown} />
}

export default MarkdownViewer
