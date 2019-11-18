const bcrypt = require('bcryptjs')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Russ', password: bcrypt.hashSync('pass', 10)},
        {id: 2, username: 'Mack', password: bcrypt.hashSync('pass', 10)},
        {id: 3, username: 'Reed', password: bcrypt.hashSync('pass', 10)},
      ]);
    });
};
