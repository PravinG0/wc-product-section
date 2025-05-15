import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://funiro-woocommerece.local/wp-json/custom/v1/products')
      .then((response) => {
        // Calculate discount and add it to each product object here
        const productsWithDiscount = response.data.map(product => {
          const regularPrice = parseFloat(product.regular_price);
          const salesPrice = parseFloat(product.sales_price);
          const discount = (regularPrice && salesPrice && salesPrice < regularPrice)
            ? Math.round(((regularPrice - salesPrice) / regularPrice) * 100)
            : 0;

          return {
            ...product,
            discount,
            price: salesPrice.toFixed(2),
            original_price: discount > 0 ? regularPrice.toFixed(2) : null,
          };
        });
        setProducts(productsWithDiscount);
      })
      .catch((err) => console.error('Error loading products', err));
  }, []);

  return (
    <div id="funiro-app">
      <div className="product-section">
        <h2>WooCommerce Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <a
                href={product.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                <div className="product-image-container">
                  {product.discount > 0 && (
                    <span className="badge discount">-{product.discount}%</span>
                  )}
                  <img src={product.image || ''} alt={product.name} />
                  <div className="overlay">
                    <a
                      href={`/cart/?add-to-cart=${product.id}`}
                      className="add-to-cart-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="price">
                    ₹{product.price}
                    {product.original_price && (
                      <span className="original-price">₹{product.original_price}</span>
                    )}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
