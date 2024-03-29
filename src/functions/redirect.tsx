import Taro from "@tarojs/taro";

export const redirectFor = (url) => {
  if (url.startsWith('pages/') && !url.startsWith('pages/subpages')) {
    return url.replace('pages/', 'pages/subpages/')
  }

  return null
}

export const tryRedirect = path => {
  const newPath = redirectFor(path.trimStart('/'));

  if (newPath) {
    Taro.redirectTo({url: newPath});
  } else {
    Taro.showModal({
      title: '未知页面',
      content: `未知页面：${path}`
    })
  }

  return
}
