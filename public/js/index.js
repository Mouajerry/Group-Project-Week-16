// Get references to page elements
var $exampleText = $("#name");
var $exampleDescription = $("#email");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var ingredientStorage = [];
var userIngredients = [];


// The API object contains methods for each kind of request we'll make
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    getExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function (example) {
    return $.ajax({
      url: "api/get-recipes/",
      type: "GET",
      data: { ingredients: [] }
    }).then(function(response) {
      userIngredients = response[0];
      // console.log("user ingredients: ",userIngredients)

      for (var i = 1; i < response.length; i++) {

        var ingredientArray = response[i].ingredients,
          index = i - 1,
          label = response[i].label,
          image = response[i].image,
          calories = response[i].calories,
          servings = response[i].servings,
          time = response[i].time,
          url = response[i].url,
          wrapper = $("<div>"),
          row = $("<div>"),
          bigColumn = $("<div>"),
          smallColumn = $("<div>"),
          img = $("<img>"),
          p = $("<p>"),
          saveButton = $('<button type="button"><i class="fas fa-heart saveHeart"></i></button>')


        ingredientStorage.push(ingredientArray),
         // console.log(ingredientStorage)

          //Build the list of recipe results dynamically
          wrapper.addClass("apiRecipe"),
        row.addClass("labelRow"),
         bigColumn.addClass("labelColumn"),
       smallColumn.addClass("buttonColumn"),
                 p.addClass("recipeLabel")
                  .attr("data-id", index)
                  .text(label),
              img.addClass("recipeImg openRecipe")
                  .attr("data-id", index)
                  .attr("src", image)
                  .attr("data-src", url)
                  .attr("data-calories", calories)
                  .attr("data-servings", servings)
                  .attr("data-time", time),
        saveButton.addClass("saveBtn saveRecipe notsaved")
                  .attr("data-saved", "false")
                  .attr("data-heart", index),


        bigColumn.append(p),
        smallColumn.append(saveButton),
        row.append(smallColumn, bigColumn),
        wrapper.append(img, row),
       $("#example-list").append(wrapper);
      }
    });
  },
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function (example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list


// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", getExample);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
