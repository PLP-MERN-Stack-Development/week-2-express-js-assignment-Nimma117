[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19825156&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```


## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

# Week 2 Assignment - Express Product API

This is a basic Product API built with **Node.js** and **Express.js**. It supports creating, reading, updating, and deleting products (CRUD) and uses middleware for authentication, logging, validation, and error handling.

## How to Run the Server

1. **Clone your repository**:
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   cd YOUR-REPO

Install dependencies: npm install
Start the server: node server.js
The server runs on http://localhost:3000 by default.

## Authentication
All /api/... routes are protected.

You must add this header to every API request: x-api-key: 12345

## API Endpoints
* GET /
Welcome message

* GET /api/products
Returns all products

* GET /api/products/:id
Get a product by ID (correct)
404 if not found (wrong)

* POST /api/products
-Add a new product

Requires a valid product object in the request body:
{
  "name": "Air Fryer",
  "description": "Smart digital air fryer",
  "price": 150,
  "category": "kitchen",
  "inStock": true
}
* PUT /api/products/:id
Update a product (correct)
404 if product not found (wrong)

* DELETE /api/products/:id
Delete a product by ID (correct)

404 if not found (wrong)

* GET /api/error
-Test route to trigger error handling middleware

Example Error Response
{
  "error": "Something went wrong! Please try again later."
}

## Testing with Postman
-Set x-api-key: 12345 in Headers
-Use Body > raw > JSON when sending POST/PUT
-Use the routes listed above

## File Structure
server.js
env.example
README.md
node_modules
