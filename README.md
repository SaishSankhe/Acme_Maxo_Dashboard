# Acme x Maxo 2017 orders data

A dashboard to visualise Acme and Maxo orders data for the year 2017.

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** PostgreSQL

## My approach to this challenge

- First, I cleaned the data files using Python, created clean csv files of Acme, Maxo.
- From new csv files, I created customers, orders, acme and maxo files for adding it into database. These files are created keeping in mind basic normalisation rules for tables in database.
- As I was going to use Node.js, I exported csv files to JSON.
- All the python files, csv files and json files can be found in "[server/data/](/server/data)".
- I used Node.js as I had more experience working with Node.js backend.
- Then I created database in postgres, connected it with backend.
- After the database was setup and connected, I developed multiple routes to insert and get data to and from the database.
- Following are the routes:

  - Insert to database

  ```
  /insert/customers
  ```

  This route is used to insert customers data from JSON file into database.

  ```
  /insert/orders
  ```

  This route is used to insert orders data from JSON file into database.

  ```
  /insert/acme
  ```

  This route is used to insert acme data from JSON file into database.

  ```
  /insert/maxo
  ```

  This route is used to insert maxo data from JSON file into database.

  - Retrieve from database

  ```
  /get/total-orders
  ```

  This route is used to get total number of orders, Acme and Maxo combined. It returns an integer.

  ```
  /get/all-orders
  ```

  This route is used to get all orders information. It returns an array.

  ```
  /get/top-10-customers
  ```

  This route is used to get top 10 customers based on order volume. It returns an array of 10 elements.

  ```
  /get/all-acme-orders
  ```

  This route is used to get all Acme order information. It returns an array.

  ```
  /get/all-maxo-orders
  ```

  This route is used to get all Maxo order information. It returns an array.

  ```
  /get/:company/:month
  ```

  This route is used to get all Acme/Maxo order information in specific months. It accepts "acme" or "maxo" as first parameter and month in "MM" format as second parameter. It returns an array.

  ```
  /get/overlap
  ```

  This route is used to get all customers who ordered from Acme and Maxo as well. It returns an array with customer information.
  
  ```
  /get/gender
  ```

  This route is used to get gender distribution data of customers who from Acme and Maxo as well. It returns an object.

- After the backend was ready, I started working on frontend with React and tailwindCSS for UI.
- I created different components for different functions, added styling using tailwindCSS.
- I integrated recharts.js to add charts to display the information.
- I also checked the webpage for basic Tota11y rules and everything passed.

## Steps to run Locally

- Clone the project

```bash
  git clone https://github.com/SaishSankhe/Xbiome_Coding_Challenge/
```

- Go to the project directory

```bash
  cd Xbiome_Coding_Challenge
```

- Install dependencies for server and client both

```bash
  cd client && npm install
```

```bash
  cd server && npm install
```

- Open "[db.js](/server/db.js)" and change the credentials to your postgres credentials.

- Open "[database.sql](/server/database.sql)" file and execute the commands. It will create "customers" database. In "customers" database, four tables will be created: customers, orders, acme, maxo.

- Start the server

```bash
  cd server && npm start
```

- Server will be running on http://localhost:5000/ Now copy/paste the following URLs to seed the database:

```bash
  http://localhost:5000/insert/customers
```

```bash
  http://localhost:5000/insert/orders
```

```bash
  http://localhost:5000/insert/acme
```

```bash
  http://localhost:5000/insert/maxo
```

- Start the client

```bash
  cd client && npm start
```

- Navigate to http://localhost:3000 to interact with client
