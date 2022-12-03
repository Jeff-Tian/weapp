import Taro from "@tarojs/taro";

function handleYuQueUrl(url: string) {
  if (url.indexOf(`yuque.com`) >= 0) {
    const slug = url.split(`/`).slice(-1)[0]

    if (slug) {
      Taro.showModal({
        title: '从剪贴板里检测到语雀链接',
        content: '是否打开语雀文章？',
        success: (res) => {
          if (res.confirm) {
            Taro.navigateTo({url: `/pages/yuque/article?slug=${slug.replace(/"/g, '')}`})
          }
        }
      })
    }
  }
}

export const handleClipboard = () => {
  Taro.getClipboardData({
    success: res => {
      handleYuQueUrl(res.data)
    }
  })
}
