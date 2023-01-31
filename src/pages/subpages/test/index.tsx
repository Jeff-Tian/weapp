import {Button, RootPortal, View} from "@tarojs/components"
import {useState} from "react";
import {createPortal} from "react-dom";

function ModalContent({ onClose }) {
  return (
    <div className='modal'>
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}


const Test = () => {
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const toggle = () => {
    setShow(!show)
  }

  return <View>Test

    <Button onClick={toggle}>显示root-portal</Button>
    {
      show && (<RootPortal><View>content</View></RootPortal>)
    }
    <button onClick={() => setShowModal(true)}>
      Show modal using a portal
    </button>
    {showModal && createPortal(
      <ModalContent onClose={() => setShowModal(false)} />,
      document.body
    )}
  </View>
}

export default Test
