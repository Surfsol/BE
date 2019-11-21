
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: 'A reflection on teaching', content: 'I really like teaching, and my students say I am good at it.', user_id: 1, link: 0, first: '', second: '', third: ''},
        {title: 'Haha, programmers amirite?', content: 'http://imgur.com/funny_image', user_id: 2, link: 1, first: '', second: '', third: ''},
        {title: 'My car broke down', content: 'See title.', user_id: 3, link: 0, first: '', second: '', third: ''},
      ]);
    });
};
