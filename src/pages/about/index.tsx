import {View} from "@tarojs/components"
import HardwayLayout from "../layout/hardway-layout"

import packageJson from '../../../package.json'

const About = () => <HardwayLayout><View>package.json 版本： {packageJson.version}</View></HardwayLayout>

export default About
