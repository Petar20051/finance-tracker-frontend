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
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="startDate"
        placeholder="Start Date"
        value={filters.startDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        placeholder="End Date"
        value={filters.endDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={filters.category}
        onChange={handleChange}
      />
      <button type="submit">Filter</button>
    </form>
  );
};

export default FilterExpenses;
