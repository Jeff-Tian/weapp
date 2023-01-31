import {Button, RootPortal, View} from "@tarojs/components"
import {useState} from "react";

const Test = () => {
  const [show, setShow] = useState(false)
  const toggle = () => {
    setShow(!show)
  }

  return <View>Test

    <Button onClick={toggle}>显示root-portal</Button>
    {
      show && (<RootPortal><View>content</View></RootPortal>)
    }</View>
}

export default Test
