import SinglePageLayout from "@/layout/single-page-layout";
import {useState} from "react";
import {UserCard} from "@/components/UserCard";

const FriendList = () => {
  const [friends, setFriends] = useState([])

  return <SinglePageLayout>
    {friends.map(f => <UserCard userInfo={f}/>)}
  </SinglePageLayout>
}

export default FriendList
