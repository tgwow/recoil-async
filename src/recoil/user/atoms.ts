import {atom, selectorFamily, selector, atomFamily} from "recoil";
import github from "../../config";

export interface IUser {
  login: string;
  followers_url: string
}

export const currentUserIdState = atom({
    key: 'currentUserIdState',
    default: 'tgwow'
})

// Atom utilizado para fazer um refresh do user
export const userInfoQueryRequestIDState = atomFamily({
  key: 'userInfoQueryRequestIDState',
  default: 0,
});

export const userInfoQuery = selectorFamily<IUser, string>({
  key: 'userInfoQuery',
  get: username => async ({ get }) => {
    get(userInfoQueryRequestIDState(username)) // Sempre que alterar o state do refreshId, uma nova query será feita
    const response = await github.get(`/users/${username}`);
    return response.data
  }
})

export const currentUserInfoQuery = selector<IUser>({
  key: 'currentUserInfoQuery',
  get: ({ get }) => get(userInfoQuery(get(currentUserIdState)))
})

export const followersInfoQuery = selector<Array<IUser>>({
  key: 'followersInfoQuery',
  get: async ({ get }) => {
    const response = await github.get(`/users/${get(currentUserIdState)}/followers`);
    return response.data
  }
})
