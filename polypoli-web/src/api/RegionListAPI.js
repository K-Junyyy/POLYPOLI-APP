import axios from "./index.js";

const getRegionList = () => {
  return axios.get("api/v1/getRegionList", {});
};

const APIs = {
  getRegionList,
};

export default APIs;
