var express = require('express');
var router = express.Router();
var data = require('../data/data');

const getApiUrl = contestId => {
  if (contestId) {
    return `/contests/${contestId}`;
  }
  return `/contests`;
};

const getInitialData = (contestId, apiData) => {
  if (contestId) {
    return {
      currentContestId: apiData.id,
      contests: {
        [apiData.id]: apiData
      }
    };
  }
  return {
    contests: apiData.contests
  };
};

const serverRender = contestId =>
  axios.get(getApiUrl(contestId)).then(resp => {
    const initialData = getInitialData(contestId, resp.data);
    window.initialData = initialData;
    return initialData;
  });

/* GET contests listing. */
const contests = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {});

router.get(['/', '/:contestId'], (req, res) => {
  res.send({
    contests: contests
  });
});

router.get('/:contestId', (req, res) => {
  let contest = contests[req.params.contestId];
  console.log(req.params.contestId);
  contest.description =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  res.send(contest);
});

module.exports = router;
