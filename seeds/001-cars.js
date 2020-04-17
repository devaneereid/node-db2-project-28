
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { 
          VIN: "86508218932",
          make: "Honda",
          model: "Pilot",
          mileage: "150,398",
          transmission: "Automatic"
        },
        { 
          VIN: "678182109465",
          make: "Ford",
          model: "Focus",
          mileage: "107,890",
          transmission: "Automatic"
        },{ 
          VIN: "988712100342",
          make: "Pontiac",
          model: "Grand Prix",
          mileage: "12,600",
          transmission: "Manual"
        }
      ]);
    });
};
