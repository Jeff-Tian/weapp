import remark from 'remark'
import remarkHtml from "remark-html"
import {View} from "@tarojs/components"
import unist from 'unist-util-visit'

function imageHandler() {
  return (tree) => {
    unist(tree, 'image', (node) => {
      node.type = 'html'
      node.value = `<img src="https://uniheart.pa-ca.me/proxy?url=${node.url}" />`
      return unist.SKIP
    })
  }
}

const WebMarkdownViewer = ({markdown}) => {
  const remarked = remark();
  const used = remarked.use(imageHandler).use(remarkHtml);
  const processed = used.process(markdown);

  return <View dangerouslySetInnerHTML={{__html: processed.contents}} />
}

export default WebMarkdownViewer
