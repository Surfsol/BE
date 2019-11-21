
exports.up = function(knex) {
    return knex.schema
    .createTable('posts', tbl => {
        tbl.increments('id'); //primary key
        tbl.text('title')
            .notNullable()
        tbl.text('content')
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
        tbl.text('first')
        tbl.text('first_subscribers')
        tbl.text('first_description')
        tbl.text('first_url')
        tbl.text('second')
        tbl.text('second_subscribers')
        tbl.text('second_description')
        tbl.text('second_url')
        tbl.text('third')
        tbl.text('third_subscribers')
        tbl.text('third_description')
        tbl.text('third_url')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posts')
};
