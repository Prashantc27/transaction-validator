# transaction-validator

This project provides examples of testing database transactions for various scenarios using Node.js and MySQL. It demonstrates how to test isolation, deadlock handling, and read-write conflicts to ensure your database system behaves correctly under concurrent and conflicting transactions.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Testing Scenarios](#testing-scenarios)
  - [Isolation Testing](#isolation-testing)
  - [Deadlock Testing](#deadlock-testing)
  - [Read-Write Conflict Testing](#read-write-conflict-testing)
- [Running the Tests](#running-the-tests)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Install Node.js from [nodejs.org](https://nodejs.org/).
- MySQL Server: Install and configure a MySQL server.

## Testing Scenarios

   ## Isolation Testing
-  The isolation testing scenario simulates two concurrent transactions that do not interfere with each other. It verifies that the database can handle concurrent transactions correctly.

   ## Deadlock Testing
-  The deadlock testing scenario simulates a deadlock situation where two transactions compete for resources. It checks whether the database system handles deadlocks gracefully.

   ## Read-Write Conflict Testing
-  The read-write conflict testing scenario tests the database's ability to handle read and write conflicts. It checks whether transactions that read and write to the same data are isolated correctly to avoid conflicts.
 
## Running the Tests

   - To run the tests, use the following command: npx mocha
   - To make POST request in order to make transaction use : http://localhost:8000/api/transactions and in the Headers section, make sure the Content-Type header is set to application/json and in the Body section, select "raw" and enter your JSON data in the request body, like this:
   - {
        "senderId": 1,
        "receiverId": 2,
        "amount": 36
     }
   - To make GET request to get the customer details use : http://localhost:8000/api/customers/:customerId
   - DDL for customers table : CREATE TABLE `customers` (
                                  `customer_id` int NOT NULL AUTO_INCREMENT,
                                  `user_name` varchar(50) NOT NULL,
                                  `email` varchar(100) NOT NULL,
                                  `balance` decimal(10,2) DEFAULT '0.00',
                                  PRIMARY KEY (`customer_id`),
                                  UNIQUE KEY `email` (`email`),
                                  CONSTRAINT `check_balance_positive` CHECK ((`balance` > 0))
                                )
   - DDL for transactions table : CREATE TABLE `transactions` (
                                    `transaction_id` int NOT NULL AUTO_INCREMENT,
                                    `sender_id` int NOT NULL,
                                    `receiver_id` int NOT NULL,
                                    `amount` decimal(10,2) NOT NULL,
                                    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                                    PRIMARY KEY (`transaction_id`)
                                  ) 

     
