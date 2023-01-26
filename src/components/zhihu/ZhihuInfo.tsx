import {useQuery} from "@apollo/client";
import {GET_PREFERENCE_QUERY} from "@/api/user-service";
import {View} from "@tarojs/components";
import JsonViewer from "@/components/JsonViewer";

const ZhihuInfo = ({infoType}) => {
  const {data, loading, error} = useQuery(GET_PREFERENCE_QUERY, {variables: {key: infoType}});

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  return <View>
    <JsonViewer json={data?.preference} />
  </View>
}

export default ZhihuInfo
