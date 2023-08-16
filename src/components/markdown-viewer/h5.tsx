import remark from 'remark'
import remarkHtml from "remark-html"
import {View} from "@tarojs/components"
import unist from 'unist-util-visit'

function proxyUrl(url) {
  if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return url;
  }

  const parts = url.split('://')

  return `/${parts[0]}/${parts[1]}`
}

function imageHandler() {
  return (tree) => {
    unist(tree, 'image', (node) => {
      node.type = 'html'
      node.value = `<img src="${proxyUrl(node.url)}" />`
      return unist.SKIP
    })
  }
}

const WebMarkdownViewer = ({markdown}) => {
  const remarked = remark();
  const used = remarked.use(imageHandler).use(remarkHtml);
  const processed = used.process(markdown);
  console.log('p = ', processed)

  return <View dangerouslySetInnerHTML={{__html: processed.contents}} />
}

export default WebMarkdownViewer
