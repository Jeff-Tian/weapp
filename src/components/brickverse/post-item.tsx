import {useEffect} from "react";
import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";

Taro.options.html.transformElement = (el, parsedElement) => {
  if (el.h5tagName === 'a') {
    el.setAttribute('class', 'brickverse-link')
  }
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix')
  }
  return el
}

const PostItem = ({title, content}) => {
  useEffect(() => {
    const onTap = (props) => {
      return (e) => {
        console.log('e = ', e);
        Taro.navigateTo({
          url: props.href,
          fail: (res) => {
            Taro.showModal({
              title: '跳转失败',
              content: `尝试跳转到 ${props.href} 失败了，可能是个人版小程序的原因，详细原因：${JSON.stringify(res)}`,
              showCancel: false
            })
          }
        }).catch(console.error)
      }
    }

    const els = document.getElementsByClassName('brickverse-link');
    console.log('els = ', els);
    for (let i = 0; i < els.length; i++) {
      els[i].addEventListener('tap', onTap(els[i].props));
      console.log('add tap event listener to ', els[i]);
    }

    return () => {
      for (let i = 0; i < els.length; i++)
        els[i].removeEventListener('tap', onTap(els[i].props));
    };
  }, []);

  return (
    <View className='at-article'>
      <View className='at-article__h1'>{title}</View>
      <View className='at-article__content taro_html'>
        <View dangerouslySetInnerHTML={{__html: content.replace(/&nbsp;/g, ' ')}}></View>
      </View>
    </View>
  )
}

export default PostItem;
