import axios from 'axios';

export const fetchContest = contestId => {
  return axios.get(`/contests/${contestId}`).then(resp => resp.data);
};
