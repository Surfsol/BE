
exports.up = function(knex) {
    return knex.schema
    .createTable('posts', tbl => {
        tbl.increments('id'); //primary key
        tbl.string('title')
            .notNullable()
        tbl.string('content')
            .notNullable()
        //foreign key, on knexfile.js, pool: is used for fk enforcement
        tbl.integer('user_id')
            .unsigned() //integer must be positive, necessary in many dbs
            .notNullable()
            //referenced on users
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.boolean('link')
            .notNullable()
            .defaultTo(0)
        tbl.string('first')
        tbl.string('second')
        tbl.string('third')
        tbl.integer('subreddit_id')
            .unsigned() //integer must be positive, necessary in many dbs
            //referenced on users
            .references('id')
            .inTable('subreddit')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posts')
};
