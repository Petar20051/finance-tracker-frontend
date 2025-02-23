import React, { useState } from 'react';
import "../styles/FilterExpenses.css";

const FilterExpenses = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="filter-expenses-form">
      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          placeholder="Enter category..."
          value={filters.category}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="filter-button">
        Filter
      </button>
    </form>
  );
};

export default FilterExpenses;
