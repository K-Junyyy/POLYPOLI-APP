import axios from "./index.js";

const getBill = (billId) => {
  return axios.get("api/v1/bill", {
    params: {
      billId: billId,
    },
  });
};

const getBillWithUserId = (billId, userId) => {
  return axios.get("api/v1/billWithUserId", {
    params: {
      billId: billId,
      userId: userId
    },
  });
};

const getHotBills = (week, month, year, userKey) => {
  return axios.get("api/v1/hotBills", {
    params: {
      week: week,
      month: month,
      year: year,
      userKey: userKey,
    }
  });
}

const APIs = {
  getBill,
  getBillWithUserId,
  getHotBills,
};

export default APIs;
