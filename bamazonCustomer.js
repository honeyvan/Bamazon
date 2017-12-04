var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "password", //removed for privacy
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  displayItems();
  // connection.end();  
});

var itemNum = 0;
var qty = 0;

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("Welcome to Bamazon! The following items are available for purchase:\n");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + ". " + res[i].product_name + " | $" + res[i].price.toFixed(2));
    }
    chooseItem();
  });
}

function chooseItem() {
	inquirer
  .prompt([
    {
      type: "input",
      message: "\nPlease enter the number of the item you'd like to purchase.\n",
      name: "selection"
    }
  ])
  .then(function(inquirerResponse) {
  	itemNum = parseFloat(inquirerResponse.selection);
    if ((itemNum < 1) || (itemNum > 10) || isNaN(itemNum)) {
      console.log("Sorry, your selection does not exist. Goodbye.")
      connection.end();
    }
    else {
      itemQty();
    }
  });
}

function itemQty() {
	inquirer
  .prompt([
    {
      type: "input",
      message: "How many would you like to purchase?\n",
      name: "count"
    }
  ])
  .then(function(inquirerResponse) {
  	qty = parseFloat(inquirerResponse.count);
    if (isNaN(qty)) {
      console.log("Sorry, you did not enter a valid quantity. Goodbye.")
      connection.end();
    }
    else {
      purchaseItem();
    }
  });
}

function purchaseItem() {
	connection.query("SELECT * FROM products WHERE item_id=?", [itemNum], function(err, res) {
      if (err) throw err;
      else if (res[0].stock_quantity < qty) {
    	console.log("Sorry, there's not enough stock! We currently have " + res[0].stock_quantity + ". Maybe next time.");
    	connection.end();
      }
      else {
      	connection.query(
		    "UPDATE products SET ? WHERE ?",
		    [
		      {
		        stock_quantity: res[0].stock_quantity - qty
		      },
		      {
		        item_id: itemNum
		      }
		    ],
		    function(err, res) {
		    	if (err) throw err;
		    }
		  );
      	console.log("Your order total is $" + (qty * res[0].price) + ". Thanks for your purchase!");
      	connection.end();
      }
    });
}