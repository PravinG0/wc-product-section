const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection config
const db = mysql.createPool({
  host: 'localhost',     // your MySQL host
  user: 'root',          // your MySQL username
  password: '',          // your MySQL password (if any)
  database: 'product_app' // replace with your DB name
});

// API route to get products
app.get('/api/products', (req, res) => {
  const query = 'SELECT id, name, image, permalink, regular_price, sales_price FROM products';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// API route to add a new product
app.post('/api/products', (req, res) => {
  const { name, image, permalink, regular_price, sales_price } = req.body;

  if (!name || regular_price == null || sales_price == null) {
    return res.status(400).json({ error: 'Name, regular_price and sales_price are required' });
  }

  const sql = `INSERT INTO products (name, image, permalink, regular_price, sales_price) VALUES (?, ?, ?, ?, ?)`;
  const values = [name, image || '', permalink || '', regular_price, sales_price];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database insert error' });
    }
    res.json({ message: 'Product added', productId: result.insertId });
  });
});


// API route to update an existing product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, image, permalink, regular_price, sales_price } = req.body;

  const sql = `UPDATE products SET name = ?, image = ?, permalink = ?, regular_price = ?, sales_price = ? WHERE id = ?`;
  const values = [name, image, permalink, regular_price, sales_price, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database update error' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
