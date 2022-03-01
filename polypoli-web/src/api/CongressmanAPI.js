import axios from "./index.js";

const getCongressman = (id) => {
  return axios.get("api/v1/congressman", {
    params: {
      id: id,
    },
  });
};

const getInterestCongressmenByUserId = (userId) => {
  return axios.get("api/v1/congressmenByUserId", {
    params: {
      userId: userId,
    },
  });
};

const getCongressmanByRegion = (region) => {
  return axios.get("api/v1/getCongressmanByRegion", {
    params: {
      region: region,
    },
  });
};

const searchCongressmanList = (name, region, party) => {
  return axios.get("api/v1/searchCongressmanList", {
    params: {
      name: name,
      region: region,
      party: party,
    },
  });
};

const APIs = {
  getCongressman,
  searchCongressmanList,
  getCongressmanByRegion,
  getInterestCongressmenByUserId,
};

export default APIs;
