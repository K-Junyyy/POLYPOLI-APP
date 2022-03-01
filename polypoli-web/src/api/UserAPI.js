import axios from "./index.js";

const getUser = (userKey) => {
  return axios.get("api/v1/user", {
    params: {
      userKey: userKey,
    },
  });
};

const getUserByUserId = (userId) => {
  return axios.get("api/v1/userByUserId", {
    params: {
      userId: userId,
    },
  });
};

const getUserByPhoneNumber = (userPhoneNumber) => {
  return axios.get("api/v1/userByPhoneNumber", {
    params: {
      userPhoneNumber: userPhoneNumber,
    },
  });
};

const getUserByUserName = (userName) => {
  return axios.get("api/v1/userByUserName", {
    params: {
      userName: userName,
    },
  });
};

const updateUserPassword = (userId, userPassword) => {
  return axios.post("api/v1/userPassword", {
    userId: userId,
    userPassword: userPassword,
  });
};

const updateUserPhoneNumber = (userKey, userPhoneNumber) => {
  return axios.post("api/v1/userPhoneNumber", {
    userKey: userKey,
    userPhoneNumber: userPhoneNumber,
  });
};

const createUser = (userId, userPassword, userPhoneNumber) => {
  return axios.post("api/v1/user", {
    userId: userId,
    userPassword: userPassword,
    userPhoneNumber: userPhoneNumber,
  });
};

const deleteUser = (userKey) => {
  return axios.delete("api/v1/user", {
    userKey: userKey,
  });
};

const setUserRegionAndProfile = (userRegionAndProfileData) => {
  return axios.put("api/v1/userRegionAndProfile", userRegionAndProfileData);
};

const updateUserRegion = (userRegionData) => {
  return axios.put("api/v1/userRegion", userRegionData);
};

const updateUserProfile = (userProfileData) => {
  return axios.put("api/v1/userProfile", userProfileData);
};

const getUserList = () => {
  return axios.get("api/v1/userList", {});
};

const checkUserId = (userId) => {
  return axios.get("api/v1/userId", {
    params: {
      userId: userId,
    },
  });
};

const updateUserStamp = (userKey, userStamp) => {
  return axios.patch("api/v1/userStamp", {
    userKey: userKey,
    userStamp: userStamp,
  });
};

const updateUserFollowings = (userKey, following) => {
  return axios.post("api/v1/userFollowings", {
    userKey: userKey,
    following: following,
  });
};

const login = (userId, userPassword) => {
  return axios.get("api/v1/login", {
    params: {
      userId,
      userPassword,
    },
  });
};

const APIs = {
  getUser,
  getUserByUserId,
  getUserByPhoneNumber,
  getUserByUserName,
  createUser,
  deleteUser,
  setUserRegionAndProfile,
  updateUserRegion,
  updateUserProfile,
  getUserList,
  checkUserId,
  login,
  updateUserPassword,
  updateUserPhoneNumber,
  updateUserStamp,
  updateUserFollowings,
};

export default APIs;
