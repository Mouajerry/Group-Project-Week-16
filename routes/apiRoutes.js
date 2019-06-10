var db = require("../models");
var axios = require("axios");
const edamam = require("../routes/edamam");

module.exports = function(app) {
  app.post("/api/users", function(req, res) {
    var data = req.body;
    console.log(data);

    db.User.findOrCreate({
      where: { name: data.name, email: data.email }
    }).then(function(result) {
      res.json(result);
    });
  });

  //*This is the route to add an Ingredient to a User's list
  //!ROUTE
  app.post("/api/add-ingredient/", function(req, res) {
    var data = req.body;

    db.Ingredient.create({
      label: data.label,
      UserId: data.UserID
    }).then(function(result) {
      res.json(result);
    });
  });

  //*This is the route to remove an Ingredient from a User's List
  //!ROUTE
  app.delete("/api/remove-ingredient/:ingredient", function(req, res) {
    var ingredient = req.params.ingredient;

    db.Ingredient.destroy({
      where: { label: ingredient }
    }).then(function(result) {
      res.json(result);
    });
  });

  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  app.get("/api/get-recipes", function(req, res) {
    //*This is the route to get the recipes from the api
    //!ROUTE
    console.log(req.body.ingredient);
    var data = req.body.ingredient;
    var search = data.join("+");

    console.log("\nincoming array: ", data);
    console.log("\nq:", search);

    edamam.search(search).then(edamamRes =>{
      res.json(edamamRes);
    })
    
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
