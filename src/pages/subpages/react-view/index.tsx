import {Button, View} from "@tarojs/components";
import {AtTextarea} from "taro-ui";
import {useState} from "react";
import {gql} from "@apollo/client";
import {DynamicContent} from "@/pages/subpages/tictactoe/dynamic-content";

const gqlTemplate = gql`query transformTsx ($code: String!) {
                transform (sourceCode: $code, extra: "") {
                    text
                }
            }`

const ReactView = () => {
  const [code, setCode] = useState(`
ReactDOM.render(<view>Hello</view>, document.getElementById('root'));
  `)

  const [vars, setVars] = useState({code})

  const renderIt = () => {
    console.log("hello")
    setVars({code})
  }

  return <View>
    <View>请输入代码：</View>
    <AtTextarea value={code} onChange={(input) => setCode(input)} count={false} focus className='code large' maxLength={Infinity} />
    <Button onClick={renderIt}>渲染</Button>
    <View>以下是渲染结果：</View>
    <DynamicContent gql={gqlTemplate} variables={vars} />
  </View>;
}

export default ReactView
