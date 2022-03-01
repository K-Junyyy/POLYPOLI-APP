import axios from "./index.js";

export default {
  getFeed: (userKey, page) => {
    return axios.post(
      "api/v1/feed",
      {
        userKey: userKey,
      },
      {
        params: {
          page: page,
          size: 10,
        },
      }
    );
  },
};
