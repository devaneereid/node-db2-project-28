
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();

        tbl.string('VIN', 256)
            .notNullable()
            .unique();

        tbl.string('make', 128)
            .notNullable();
        
        tbl.string('model', 128)
            .notNullable();
        
        tbl.decimal('mileage');
            
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
