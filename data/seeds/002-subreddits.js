
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subreddit').del()
    .then(function () {
      // Inserts seed entries
      return knex('subreddit').insert([
        {id: 1, title: 'ESL'},
        {id: 2, title: 'progammingHumor'},
        {id: 3, title: 'cars'}
      ]);
    });
};
