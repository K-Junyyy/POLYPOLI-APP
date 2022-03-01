import axios from 'axios';

export default axios.create({
  baseURL: 'http://polypoli.kr',
  header: {
    'Content-Type': 'application/json'
  }
})
