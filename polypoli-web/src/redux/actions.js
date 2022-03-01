import constants from "./constants";

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성합니다.
export const login = (userData) => ({
  type: constants.LOGIN,
  userData,
});
export const logout = () => ({
  type: constants.LOGOUT,
});
export const updateUserStamp = (userStamp) => ({
  type: constants.UPDATE_USER_STAMP,
  userStamp,
});

export const updateUserRegion = (userRegionData) => ({
  type: constants.UPDATE_USER_REGION,
  userRegionData,
});

export const updateUserProfile = (userProfileData) => ({
  type: constants.UPDATE_USER_PROFILE,
  userProfileData,
});

export const updateUserPhoneNumber = (userPhoneNumber) => ({
  type: constants.UPDATE_USER_PHONE_NUMBER,
  userPhoneNumber,
});

export const updateUserFollowings = (followId, isFollowing) => ({
  type: constants.UPDATE_USER_FOLLOWINGS,
  followId,
  isFollowing,
});
