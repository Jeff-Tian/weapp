import {useQuery} from "@apollo/client";
import {GET_PREFERENCE_QUERY} from "@/api/user-service";
import {StorageKeys} from "@/common/constants";
import {View} from "@tarojs/components";

const ZhihuCookie = () => {
  const {data, loading, error} = useQuery(GET_PREFERENCE_QUERY, {variables: {key: StorageKeys.zhihuUserCookie}});

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  return <View>
    {data.myPreference.key}:
    {data.myPreference.value}
  </View>
}

export default ZhihuCookie
