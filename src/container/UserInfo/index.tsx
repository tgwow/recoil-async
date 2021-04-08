import React, {ReactNode} from 'react';
import {useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState} from "recoil";
import {currentUserInfoQuery, userInfoQueryRequestIDState} from "../../recoil";
import FollowersList from "../FollowersList";

const useRefreshUserInfo = (userId: string) => {
  // useSetRecoilState retorna só o set, como se fosse o segundo parametro do useState()
  const setUserInfoQueryRequestId = useSetRecoilState(userInfoQueryRequestIDState(userId))
  return () => setUserInfoQueryRequestId(requestId => requestId + 1)
}

const UserInfo = () => {
  const userInfoLoadable = useRecoilValueLoadable(currentUserInfoQuery)
  let content = () : null | ReactNode => null
  switch (userInfoLoadable.state) {
    case 'hasValue':
      content = () => <h1>Current user: {userInfoLoadable.contents.login}</h1>
      break;
    case 'hasError':
      throw userInfoLoadable.contents
  }
  const refreshUser = useRefreshUserInfo(userInfoLoadable.state === 'hasValue' ? userInfoLoadable.contents.login : '')


  return (
    <div className='container'>
      {content()}
      <button onClick={refreshUser}>Refresh User Info</button>
      <FollowersList/>
    </div>
  );
};

export default UserInfo;
