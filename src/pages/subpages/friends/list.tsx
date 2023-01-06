import SinglePageLayout from "@/layout/single-page-layout";
import {UserCard} from "@/components/UserCard";
import {gql, useQuery} from "@apollo/client";
import {authingAppId} from "@/common/constants";
import {useEffect, useState} from "react";
import {AtLoadMore} from "taro-ui";
import {View} from "@tarojs/components";

const QUERY = gql`
  query GetFriendList($page: Int!, $pageSize: Int!) {
    friendListByPage (appId: "${authingAppId}", page: $page, pageSize: $pageSize) {
      list {
        name
        email
        nickname
        userId
        username
        lastLogin
        phone
        photo
        loginsCount

      }
      totalCount
    }
  }
`

const FriendList = () => {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(5)
  const [status, setStatus]: ['more' | 'loading' | 'noMore' | undefined, Function] = useState('loading')

  const [friends, setFriends] = useState([])

  const {loading, error, data, refetch} = useQuery(QUERY, {variables: {page, pageSize}})

  const loadMore = () => {
    setPage(page + 1)
    setStatus('loading')
    refetch({page: page + 1, pageSize}).then()
  }

  useEffect(() => {
    if (data) {
      if (data.friendListByPage.list.length < pageSize) {
        setStatus('noMore')
      } else {
        setStatus('more')
      }

      setFriends(friends.concat(data.friendListByPage.list))
    }
  }, [data])

  if (loading) {
    return <SinglePageLayout>Loading...</SinglePageLayout>
  }

  if (error) {
    return <SinglePageLayout>Error: {error.message}</SinglePageLayout>
  }

  return <SinglePageLayout>
    <View>一共有 {data.friendListByPage.totalCount} 位朋友</View>
    {friends.map(f => <UserCard key={f.userId} userInfo={f}/>)}
    <AtLoadMore onClick={loadMore} status={status}/>
  </SinglePageLayout>
}

export default FriendList
