import constants from "./constants";

const initialState = {
  userData: {
    userKey: -1,
    userId: "",
    userPhoneNumber: "",
    userName: "",
    userArea: "",
    userRegion: "",
    regionCongressmanId: 0,
    userStamp: false,
    userGender: "",
    userYearOfBirth: 0,
    userFollowings: "",
    userImg: "",
  },
};

/* 리듀서 함수 정의 */
// state 의 초기값을 initialState 로 지정
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // 로그인
    case constants.LOGIN:
      return {
        ...state,
        userData: action.userData,
      };
    // 로그아웃
    case constants.LOGOUT:
      return {
        ...state,
        userData: initialState.userData,
      };
    // 투표 도장 업데이트
    case constants.UPDATE_USER_STAMP:
      return {
        ...state,
        userData: {
          ...state.userData,
          userStamp: action.userStamp,
        },
      };
    // 휴대폰 번호 업데이트
    case constants.UPDATE_USER_PHONE_NUMBER:
      return {
        ...state,
        userData: {
          ...state.userData,
          userPhoneNumber: action.userPhoneNumber,
        },
      };
    // 유저 팔로잉 업데이트
    case constants.UPDATE_USER_FOLLOWINGS:
      let followingsArr = state.userData.userFollowings.split(",");
      if (followingsArr[0] === "") followingsArr = [];
      let newFollowings = "";
      // 팔로잉 시
      if (action.isFollowing) {
        followingsArr.push(action.followId);
      }
      // 언팔로잉 시
      else {
        let index = followingsArr.indexOf(String(action.followId));
        if (index > -1) followingsArr.splice(index, 1);
      }
      newFollowings = followingsArr.join(",");
      return {
        ...state,
        userData: {
          ...state.userData,
          userFollowings: newFollowings,
        },
      };
    // 내지역 변경 업데이트
    case constants.UPDATE_USER_REGION:
      return {
        ...state,
        userData: {
          ...state.userData,
          userArea: action.userRegionData.userArea,
          userRegion: action.userRegionData.userRegion,
          regionCongressmanId: action.userRegionData.regionCongressmanId,
        },
      };
    // 프로필 변경 업데이트
    case constants.UPDATE_USER_PROFILE:
      return {
        ...state,
        userData: {
          ...state.userData,
          userName: action.userProfileData.userName,
          userGender: action.userProfileData.userGender,
          userYearOfBirth: action.userProfileData.userYearOfBirth,
          userFollowings: action.userProfileData.userFollowings,
          userImg: action.userProfileData.userImg,
        },
      };

    default:
      return state;
  }
}
