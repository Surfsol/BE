
exports.up = function(knex) {
    return knex.schema
    .createTable('subreddit', tbl => {
        tbl.increments('id'); //primary key
        tbl.string('title')
            .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('subreddit')
};
