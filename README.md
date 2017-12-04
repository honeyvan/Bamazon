# Bamazon

### Description
Simple Amazon-like storefront app using mySQL and Inquirer via Node.

### Functionality
When the customer accesses the app, Bamazon will list all available items on sale. The user will be prompted to select an item for purchase, followed by the quantity. If the item is in stock, the order will be completed and the customer will see the total receipt for their purchase.

![Working](screenshots/Working.PNG)

Following a successful purchase, the table will be updated for the remaining quantity - in this case, the stock for Christmas Lights was depleted from 92 to 89:

![sql1](screenshots/sql1.PNG)

![sql2](screenshots/sql2.PNG)

Bamazon also checks for user input errors. Customers will be booted out if the item id/quantity is not valid or if the item is out of stock:

![Input error 1](screenshots/Input%20Error%201.PNG)

![Input error 2](screenshots/Input%20Error%202.PNG)

### Technologies Used
* Javascript
* Node.js
* MySQL
* Inquirer npm package
