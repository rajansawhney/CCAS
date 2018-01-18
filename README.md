# Central Cascade Automative Sales 

CBT Nuggets Node.js project

Our project manager has come to us with a brand new product-- an exciting online ordering
system for custom vehicle orders. Since we have a lot of customers who like to choose options
we don’t necessarily have in stock, we have decided to build an interface through which the
customers can place their orders. This user client will require a backend service to
communicate with. The purpose of this service will be to take an order and send it off to the
appropriate supplier for delivery.

## Project Workflow
	1.	Customer provides {customer_id, make, model, package} as request to Central Cascade
		Automotive Sales(CCAS). 
		CCAS maintains Customer Schema as described below.

	2.	CCAS validates customer_id against stored customer information.
		If the customer_id is invalid -> stop request.
		If the customer's mentioned Shipping address in not in USA, decline service.

	3.	If the customer_id and make are valid, do the following depending on the “make”

			1.	If make is “Acme Autos” or "ACME"
				-	Send request to the Acme API with {api_key, model, package}
				-	Only a valid api_key guarantees response from the Acme API
				-	Acme sends back {order_id} as response

			2.	If make is “Rainier” or "Rainier Transportation Solution" or "RTS"
				-	Send token request to the RTS API with {storefront}
				-	RTS responds with {nonce_token}
				-	CCAS posts request to RTS with {nonce_token, model, package}
				-	RTS replies back with {order_id} as response if nonce_token is valid

	4.	Store order details for internal use: 
		{order_id, customer_id, supplier_id, make, model, package} 
			-	Supplier_id helps identify supplier. order_id and customer_id cannot uniquely 
				identify the supplier. Eg: Both Acme and Rainier could have the same order_id
			-	Make is unique in our case, but by convention it is better to use IDs than strings.

	5.	Inform customer of successful request and provide json object link for that order_id

## Database Model


**1.	Customer**

{ customerId, name.firstName, name.LastName, address.city, address.state, address.country }

**2.	Orders**

{ orderId, customerIid, supplierIid, make, model, package}

NOTE : here orderId represents the orderId returned by the Supplier API on successful order placement

**3.	Supplier**

{ supplierId, make, api_key, storefront, token }


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node.js - v6.9.1
* Express.js
* MongoDB

Packages used:

```
Nodemon - For seamless building of the project
Lodash - JavaScript utility functions
Axios - Handling HTTP requests

```

### Installing

Clone the project using :
```
git clone https://github.com/rajan3012/CCAS.git
```

### Run the servers

Open the servers in different terminals. Each server runs on an individual terminal

Start CCAS server
```
npm start ccas
```

Start ACME server
```
npm start acme
```

Start RTS (Rainier) server
```
npm start rts
```

###Running the project:

Once you have all the servers up and running, let's begin to use this application!

Let's add a customer to our Customer database. 

-- Open Postman 
--	Do a post request on:
```
http://localhost:3000/customer
```
--	Go to Body in postman, select x-www-form-urlencoded and enter:
			
			name.firstName = Rajan
			name.lastName = Saw
			address.city = Eugene
			address.state = Oregon
			address.country = USA

-- Hit send. You should get back an json object. Something like this:
```
{ name: {
		firstName: 'Rajan', lastName: 'Saw' },
		address: { 
			city: 'Eugene', 
			state: 'Oregon', 
			country: 'USA' 
		},
	_id: 5a602b8295701c26d5da35ce,
	__v: 0
}

```

Hey hey! We have our first customer!

You can go a GET at the customer URL to see all customers in the database

Let's add two suppliers : ACME Autos and Rainier Transportation Solutions


Adding ACME Autos:

-- In postman open 
```
http://localhost:3000/customer
```
-- POST request using:
	
	supplierId: 111
	make: ACME Autos
	api_key: cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6

-- Hit send. Now let's add RTS information:

	supplierId: 222
	make: RTS 
	api_key: ccas-bb9630c04f 
	
-- Hit send again, and we should have something like this:
```
[
{
	"_id": "5a60131fe720ba1cb706c26c",
		"supplierId": 111,
		"make": "ACME",
		"api_key": "cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6",
		"__v": 0
},
{
	"_id": "5a60144ce720ba1cb706c26d",
	"supplierId": 222,
	"make": "RTS",
	"storefront": "ccas-bb9630c04f",
	"__v": 0
}
]
```

Yay! We customers and supplier! Let's place some orders!

-- To place an order go to:
```
http://localhost:3000/order
```
-- Select post and select x-www-form-urlencoded and enter:
-- Enter the following details in body:

	customerId: // this is _id of the customer in our database
	make: //ACME or RTS
	model: //some model eg:[olympic, roadrunner]
	carPackage: //some package eg:[lite, extreme, mtn]


-- Hit send and if you see something like this:
```
{
	"message": "Order placed successfully",
		"order_details": {
			"_id": "5a602baa95701c26d5da35cf",
			"customerId": "5a602b8295701c26d5da35ce",
			"make": "RTS",
			"model": "olympic",
			"carPackage": "mtn",
			"supplierId": 222,
			"orderId": 4568140,
			"__v": 0
		},
		"link": "http://localhost:3000/order/order-4568140"
}
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Authors

* **Rajan Sawhney** [rajan3012](https://github.com/rajan3012)


## License

This readme is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

