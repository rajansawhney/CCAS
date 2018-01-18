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

End with an example of getting some data out of the system or using it for a little demo

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

