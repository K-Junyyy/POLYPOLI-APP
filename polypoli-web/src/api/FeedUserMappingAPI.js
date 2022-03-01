import axios from './index.js';

export default {
  upsertFeedLike: (feed_id, user_id, like) => {
    return axios.post('api/v1/feedUserMapping', {
      "feedId": feed_id,
      "userId": user_id,
      "like": like
    });
  }
}
