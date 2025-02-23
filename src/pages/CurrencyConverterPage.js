import React from 'react';
import CurrencyConverter from '../components/CurrencyConverter';
import "../styles/CurrenctConverterPage.css";

const CurrencyConverterPage = () => (
  <div className="currency-converter-page">
    <h1 className="page-title">Currency Converter</h1>
    <p className="page-description">
      Use our Currency Converter to easily convert amounts from one currency to another. Simply enter the required details below and get the converted amount instantly.
    </p>
    <CurrencyConverter />
  </div>
);

export default CurrencyConverterPage;
