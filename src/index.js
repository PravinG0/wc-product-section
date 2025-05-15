import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductSection from './App';
import reportWebVitals from './reportWebVitals';
import BasicSlider from './components/BasicSlider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductSection />
    <BasicSlider />
  </React.StrictMode>
);

reportWebVitals();
