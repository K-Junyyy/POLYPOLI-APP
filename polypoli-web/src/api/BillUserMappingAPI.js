import axios from './index.js';

export default {
  upsertBillLike: (bill_id, user_id, like) => {
    return axios.post('api/v1/billUserMapping', {
      "billId": bill_id,
      "userId": user_id,
      "like": like
    });
  }
}
