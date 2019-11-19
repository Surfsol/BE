
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subreddit').del()
    .then(function () {
      // Inserts seed entries
      return knex('subreddit').insert([
        {title: 'ESL'},
        {title: 'progammingHumor'},
        {title: 'cars'}
      ]);
    });
};
