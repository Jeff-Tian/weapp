import {gql, useQuery} from "@apollo/client"
import {Text} from "@tarojs/components"
import HardwayLayout from "../layout/hardway-layout"

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

  return <HardwayLayout><Text>YuQue Blog</Text></HardwayLayout>
}

export default YuQue
