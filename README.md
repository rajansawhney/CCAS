# Central Cascade Automative Sales 

CBT Nuggets Node.js project

Our project manager has come to us with a brand new product-- an exciting online ordering
system for custom vehicle orders. Since we have a lot of customers who like to choose options
we don’t necessarily have in stock, we have decided to build an interface through which the
customers can place their orders. This user client will require a backend service to
communicate with. The purpose of this service will be to take an order and send it off to the
appropriate supplier for delivery.

## Project Workflow
	1.	Customer provides {customer_id, make, model, package} as request to Central Cascade Automotive Sales(CCAS). Further customer details stored with CCAS – customer_id, customer_name, customer_address

	2.	CCAS validates customer_id against stored customer information. If the customer_id is
			invalid -> stop request.

	3.	If the customer_id and make are valid, do the following depending on the “make”

			1.	If make is “Acme”
				-	Send request to Acme with {api_key, model, package}
				-	If api_key is invalid -> stop request
				-	Else, Acme sends back {order_id}

	2.	If make is “Rainer”
			-	Send token request to Rainier using “storefront”
			-	Rainier responds with {nonce_token}
			-	CCAS posts request to Rainier with {token, model, package}
			-	Rainier replies back with {order_id}

	4.	Store order details for internal use: 
			{order_id, customer_id, supplier_id, make, model, package} 
			-	Supplier_id helps identify supplier. order_id and customer_id cannot uniquely 
				identify the supplier. Eg: Both Acme and Rainier could have the same order_id
			-	Make is unique in our case, but by convention it is better to use IDs than strings.

	5.	Inform customer of successful request and provide json object link for that order_id
			-	JSON object will contain {order_id, customer_id, make, model, package}

## Database Model

DATABASE MODEL (SCHEMA):

1.	Customer
{ customer_id, customer_name, customer_address }

2.	Orders
{ order_id, customer_id, supplier_id, make, model, package}

3.	Supplier
Acme: { supplier_id, make, api_key, token }
Rainier: { supplier_id, make, storefront, token }


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node.js - v6.9.1

Packages used:

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
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

