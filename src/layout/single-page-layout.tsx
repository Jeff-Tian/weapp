import {View} from "@tarojs/components";
import {HighLevel} from "@/layout/high-level";

const SinglePageLayout = ({children}) => {
  return <View>
    <HighLevel />
    <View style={{padding: '10px'}}>{children}</View>
  </View>
}

export default SinglePageLayout
