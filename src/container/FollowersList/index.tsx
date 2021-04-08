import React from 'react';
import {useRecoilCallback, useRecoilState, useRecoilValue, useRecoilValueLoadable} from "recoil";
import {currentUserIdState, followersInfoQuery, userInfoQuery} from "../../recoil";

const FollowersList = () => {
  const followersListLoadable = useRecoilValueLoadable(followersInfoQuery)
  const [, setCurrentUserIdState] = useRecoilState(currentUserIdState)

  const changeUser = useRecoilCallback(({ snapshot, set }) => (userId: string) => {
    snapshot.getLoadable(userInfoQuery(userId)) // Começa fazer a busca antes de setar o novo usuário (Usado para operações custosas)
    set(currentUserIdState, userId) // Seta o novo usuário enquanto o fetch esta sendo feito
  })

  let content = () => <h2>Loading...</h2>

  if (followersListLoadable.state === 'hasValue')
    content = () => (
      <>
        {followersListLoadable.contents.map((follower) => (
          <li
            key={follower.login}
            onClick={() => changeUser(follower.login)}
          >
            {follower.login}
          </li>
        ))}
      </>
    )
  return (
    <div>
      <h2>Followers list: </h2>
      <ul>
        {content()}
      </ul>
    </div>
  );
};

export default FollowersList;
