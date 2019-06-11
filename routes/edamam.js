const axios = require("axios");

var appID = process.env.appID;
var appKey = process.env.appKey;

const Edaman = {
    search: (search)=>{
      console.log(search)
    var query =
      "https://api.edamam.com/search?q=" +
      search +
      "&app_id=" +
      appID +
      "&app_key=" +
      appKey +
      "&from=0&to=8";

    // console.log("query:", query);

    //Make the API Call
    return axios
      .get(query)
      .then(function(response) {
        var Recipe = response.data.hits;
        var recipeArray = [];

        for (var i = 0; i < Recipe.length; i++) {
          console.log("\n");
          console.log(Recipe[i].recipe.label);
          console.log(Recipe[i].recipe.image);
          console.log(Recipe[i].recipe.url);
          console.log(Recipe[i].recipe.ingredientLines);
          console.log(Recipe[i].recipe.calories);
          console.log(Recipe[i].recipe.yield);
          console.log(Recipe[i].recipe.totalTime);
          console.log("\n");

          var recipe = {
            label: Recipe[i].recipe.label,
            image: Recipe[i].recipe.image,
            url: Recipe[i].recipe.url,
            ingredients: Recipe[i].recipe.ingredientLines,
            calories: Recipe[i].recipe.calories,
            servings: Recipe[i].recipe.yield,
            time: Recipe[i].recipe.totalTime
          };

          recipeArray.push(recipe);
        }

        return recipeArray;
      })
      .catch(function(error) {
        console.log(error);
      });
    }
};


module.exports = Edaman;