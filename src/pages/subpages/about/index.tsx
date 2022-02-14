import { View } from "@tarojs/components"

import HardwayLayout from "../../../layout/hardway-layout"

import packageJson from '../../../../package.json'
import SystemInfo from "./system.info";

const About = () => {
  return <HardwayLayout>
    <View>package.json 版本： {packageJson.version}</View>
    <View>
      源代码： https://github.com/jeff-tian/weapp
    </View>
    <SystemInfo /></HardwayLayout>;
}

export default About
