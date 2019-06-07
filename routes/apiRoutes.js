var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  app.post("/api/users", function(req, res) {

    var data = req.body
    console.log(data)

    db.User.findOrCreate({ where: { name: data.name, email: data.email }}
    
      ).then( function(result) {
      res.json(result)
    })
  })

  //*This is the route to add an Ingredient to a User's list
  //!ROUTE
  app.post("/api/add-ingredient/", function(req, res) {

    let data = req.body

    db.Ingredient.create
    ({ label: data.label,
      UserId: data.UserID
    }).then( function(result) {
      
      res.json(result) 
    
    })
  })






  //*This is the route to remove an Ingredient from a User's List
  //!ROUTE
  app.delete("/api/remove-ingredient/:ingredient", function(req, res) {

    let ingredient = req.params.ingredient

    db.Ingredient.destroy
    ({
      where: { label: ingredient }
    }).then( function(result) {
      res.json(result)
    })
  })



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

  app.post("/api/get-recipes", function(req, res) {
      //*This is the route to get the recipes from the api
  //!ROUTE
  
    //Build the api query. First build the q parameter
    console.log(req.body.ingredient);
    // let data = JSON.parse(req.body);
    let data = req.body.ingredient;
    let search = "q=";
    let recipeArray = [];
    let userIngredients = [];

    console.log("\nincoming array: ",data);

    for (let i = 0; i < data.length; i++) {

      if (i < (data.length - 1)) {
        search += data[i] + "+"
        userIngredients.push(data[i])
      } else { 
        search += data[i]
        userIngredients.push(data[i])
      } 
    }

    recipeArray.push(userIngredients)
    console.log("first stage recipeArray: ",recipeArray)

    console.log("\nq:",search)
    //At this point the q parameter is constructed. Now build the rest of the api query.

    let appID = process.env.appID;
    let appKey = process.env.appKey;
    let  query = "https://api.edamam.com/search?" + search + "&app_id=" + appID + "&app_key=" + appKey + "&from=0&to=8"

    console.log("query:",query)

    //Make the API Call
    axios.get(query)
         .then( function(response) { 

            let Recipe = response.data.hits
                
            for ( let i = 0; i < Recipe.length; i++ ) {

              console.log("\n")
              console.log(Recipe[i].recipe.label)
              console.log(Recipe[i].recipe.image)
              console.log(Recipe[i].recipe.url)
              console.log(Recipe[i].recipe.ingredientLines)
              console.log(Recipe[i].recipe.calories)
              console.log(Recipe[i].recipe.yield)
              console.log(Recipe[i].recipe.totalTime)
              console.log("\n")

              let recipe = { label: Recipe[i].recipe.label,
                             image: Recipe[i].recipe.image,
                             url: Recipe[i].recipe.url,
                             ingredients: Recipe[i].recipe.ingredientLines,
                             calories: Recipe[i].recipe.calories,
                             servings: Recipe[i].recipe.yield,
                             time: Recipe[i].recipe.totalTime
                            }

              recipeArray.push(recipe)              
            }
            res.send(recipeArray)
          }).catch(function(error) { console.log(error)})
  

  })

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
