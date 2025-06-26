// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

//Initialize Express app (do this only once!)
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware setup
app.use(bodyParser.json());

//Logger middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Apply logger to all routes
app.use(logger);

//Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== '12345') {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing API key.' });
  }

  next();
};

//test error route 
app.get('/api/error', (req, res) => {
  throw new Error('Test error');
});
//Apply middleware only to /api routes
app.use('/api', authenticate);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

//Validation middleware
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid product data. Please check all fields.' });
  }

  next();
};

// Root route
app.get('/', (req, res) => {  
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deletedProduct = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deletedProduct[0] });
});


// Example route implementation for GET /api/products
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Unexpected Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong! Please try again later.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 