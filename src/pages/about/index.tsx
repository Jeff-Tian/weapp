import {View} from "@tarojs/components"
import HardwayLayout from "../layout/hardway-layout"

import packageJson from '../../../package.json'
import SystemInfo from "./system.info";


const About = () => <HardwayLayout><View>package.json 版本： {packageJson.version}</View><SystemInfo/></HardwayLayout>

export default About
