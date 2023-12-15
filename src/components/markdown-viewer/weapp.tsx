import {View} from "@tarojs/components"
import remark from "remark";
import remarkHtml from "remark-html";

const WeappMarkdownViewer = ({markdown}) => {
  const remarked = remark();
  const used = remarked.use(remarkHtml);
  const processed = used.process(markdown.replace(/&nbsp;/g, ' '));

  return <View dangerouslySetInnerHTML={{__html: processed.contents}}></View>
}

export default WeappMarkdownViewer
