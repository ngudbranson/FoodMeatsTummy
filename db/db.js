const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

const db = pgp('postgres://recipe_recommendations_user:root@localhost/recipe_recommendations');

const getRecommendations = (callback) => {
  const queryString = 'SELECT * FROM food;';
  db.any(queryString)
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
}

module.exports = {
  getRecommendations,
};