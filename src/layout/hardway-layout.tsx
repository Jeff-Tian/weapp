import {View} from "@tarojs/components"
import {HighLevel} from "@/layout/high-level";

import HardwayTabs from './tabs'
import '../components/rich-modal.styl'

const HardwayLayout = ({children}) => {
  return <View>
    <HighLevel />
    <HardwayTabs>
      <View style={{minHeight: '1000px'}}>
        {children}
      </View>
    </HardwayTabs>
  </View>
}

export default HardwayLayout
