import {gql, useQuery} from "@apollo/client"
import {View, Text} from "@tarojs/components"

const YUQUE_BLOG = gql`
        query {
          yuque(id: "53296538") {
            id
            title
          }
        }
  `

const YuQue: React.FC = () => {
  const {loading, error, data} = useQuery(YUQUE_BLOG)

  console.log(loading, error, data);

  return <View><Text>YuQue Blog</Text></View>
}

export default YuQue
