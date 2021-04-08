import React, { useState} from 'react';
import { useRecoilValue} from "recoil";
// import {followersListQuery } from '../../recoil'

const UserSearch = () => {
    const [username, setUsername] = useState('')
    // const followers = useRecoilValue(followersListQuery(username))

    const onChangeUsername = ({ target: { value }} : React.ChangeEvent<HTMLInputElement>) => {
        setUsername(value)
    }
  return (
    <>
        <h1>Input an username to see its followers:</h1>
        <input value={username} onChange={onChangeUsername}/>
        <button>Search</button>
    </>
  );
}

export default UserSearch;
