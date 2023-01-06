import SinglePageLayout from "@/layout/single-page-layout";
import {UserCard} from "@/components/UserCard";
import {gql, useQuery} from "@apollo/client";
import {authingAppId} from "@/common/constants";

const QUERY = gql`
  query GetFriendList {
    friendList (appId: "${authingAppId}") {
      list {
        name
        email
        nickname
        userId
        username
      }
      totalCount
    }
  }
`

const FriendList = () => {
  const {loading, error, data} = useQuery(QUERY, {})

  if (loading) {
    return <SinglePageLayout>Loading...</SinglePageLayout>
  }

  if (error) {
    return <SinglePageLayout>Error: {error.message}</SinglePageLayout>
  }
  console.log('data = ', data)
  return <SinglePageLayout>
    {data.friendList.list.map(f => <UserCard key={f.userId} userInfo={f} />)}
  </SinglePageLayout>
}

export default FriendList
