import React from 'react';
import CurrencyConverter from '../components/CurrencyConverter';
import "../styles/CurrenctConverterPage.css";

const CurrencyConverterPage = () => (
  <div className="currency-converter-page">
    <h1 className="page-title">Currency Converter</h1>
    <CurrencyConverter />
  </div>
);

export default CurrencyConverterPage;
