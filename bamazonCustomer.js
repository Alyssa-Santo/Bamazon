var inquirer = require('inquirer');
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'test',
  database: 'Bamazon'
});

//connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
});




// function which prompts the user for what action they should take
var start = function() {
  inquirer.prompt({
    name: "ListItems",
    type: "list",
    message: "Would you like to see items for sale?",
    choices: ["Yes", "No"]
  }).then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.ListItems.toUpperCase() === "No") {
      
    }
    else {
      saleitems();
    }
  });
};

var saleitems = function() {
	connection.query("SELECT * FROM products", function(err, results) {
	if (err) throw err;

	console.log(results);

		inquirer.prompt([
			{
				name: "choice",
				type: "list",
				choices: function() {
					var choiceArray = [];
					for (var i = 0; i < results.length; i++) {
					choiceArray.push(results[i].item_id);
				}
				return choiceArray;
			},
			message: "What is the ID of the product you would like to buy?"
	      },
	      {
	        name: "amount",
	        type: "input",
	        message: "How many units would you like?"
	      }
		]).then(function(answer) {
			var chosenItem;
			for (var i = 0; i <results.length; i++) {
				if (results[i].item_id === answer.choice) {
					chosenItem = results[i];
					console.log("This is new chosen item amount");
					console.log(chosenItem.stock_quantity);
					console.log('This is your answer amount');
					console.log(answer.amount);
				}
			}

			if (parseInt(chosenItem.stock_quantity) >= parseInt(answer.amount)) {
				// connection.query("UPDATE products SET stock_quantity = " + , [{
				// 	stock_quantity: answer.amount
				// }, {
				// 	id: chosenItem.id
				// }], function(error) {
				// 	if (error) throw err;
				// 	console.log("Order entered successfully!");
				// 	start();
				// });
				console.log(answer.choice);
				connection.query("UPDATE products SET stock_quantity = " + 
					(chosenItem.stock_quantity - answer.amount) + 
					" WHERE item_id = " + answer.choice, function(err, results){
						console.log(answer.choice);
						if(err){
							
							console.log(err);
						}

						console.log("Order entered successfully!");
						start();

					})
			}
			else {
				console.log("Insufficient quantity! Enter a lower quantity.");
				start();
			}
		});
	});
};

start();