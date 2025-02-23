import React, { useState, useEffect } from "react";
import {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
  filterBudgets,
  getBudgetSummary,
  getBudgetPerformance,
} from "../api/budget";
import "../styles/BudgetPage.css";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: "", limit: 0, spent: 0 });
  const [editingBudget, setEditingBudget] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [summary, setSummary] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [budgetsData, summaryData, performanceData] = await Promise.all([
        getBudgets(),
        getBudgetSummary(),
        getBudgetPerformance(),
      ]);

      if (budgetsData && budgetsData.data) {
        setBudgets(budgetsData.data);
      } else {
        setBudgets([]);
      }

      setSummary(summaryData || []);
      setPerformance(performanceData || []);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterBudgets = async () => {
    setLoading(true);
    try {
      if (filterCategory.trim()) {
        const filteredData = await filterBudgets(filterCategory);
        setBudgets(filteredData || []);
      } else {
        // If no filter, reload all data
        fetchAllData();
      }
    } catch (err) {
      setError("Failed to filter budgets. Please check the category and try again.");
      console.error("Error filtering budgets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setFilterCategory("");
    fetchAllData();
  };

  const handleAddBudget = async () => {
    try {
      await addBudget(newBudget);
      setNewBudget({ category: "", limit: 0, spent: 0 });
      fetchAllData();
    } catch (err) {
      setError("Failed to add budget. Please check your input and try again.");
      console.error("Error adding budget:", err);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await deleteBudget(id);
      fetchAllData();
    } catch (err) {
      setError("Failed to delete budget. Please try again.");
      console.error("Error deleting budget:", err);
    }
  };

  const handleUpdateBudget = async () => {
    if (!editingBudget || !editingBudget.id) {
      setError("Invalid budget ID. Please select a valid budget to edit.");
      console.error("Update failed: Invalid ID.");
      return;
    }
    try {
      await updateBudget(editingBudget.id, newBudget);
      setEditingBudget(null);
      setNewBudget({ category: "", limit: 0, spent: 0 });
      fetchAllData();
    } catch (err) {
      setError("Failed to update budget. Please try again.");
      console.error("Error updating budget:", err);
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setNewBudget({
      category: budget.category,
      limit: budget.limit,
      spent: budget.spent,
    });
  };

  return (
    <div className="budget-page">
      <h2 className="center-text">Budgets</h2>
      <p className="instructions">
        Welcome to your Budget Manager. Here, you can add new budgets, update existing ones, and track your spending. Use the filter tool to quickly locate budgets by category.
      </p>
      {error && <div className="error-alert">{error}</div>}

      {/* Filter Section */}
      <div className="budget-form-group">
        <label htmlFor="filter">Filter Budgets by Category</label>
        <input
          id="filter"
          type="text"
          placeholder="Enter category to filter..."
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <button className="budget-btn budget-btn-primary margin-top" onClick={handleFilterBudgets}>
          Apply Filter
        </button>
        <button className="budget-btn budget-btn-secondary margin-top margin-left" onClick={handleClearFilter}>
          Clear Filter
        </button>
      </div>

      {/* Budget List */}
      <h3 className="margin-top">Budget List</h3>
      <p className="instructions">
        Below is a list of your current budgets. Use the "Edit" or "Delete" buttons to modify your entries.
      </p>
      {loading ? (
        <div>Loading budgets...</div>
      ) : budgets.length > 0 ? (
        <ul className="budget-list">
          {budgets.map((budget) => (
            <li key={budget.id} className="budget-list-item">
              <div>
                <strong>{budget.category}</strong>: Limit - {budget.limit}, Spent - {budget.spent}
              </div>
              <div>
                <button className="budget-btn budget-btn-danger" onClick={() => handleDeleteBudget(budget.id)}>
                  Delete
                </button>
                <button className="budget-btn budget-btn-primary" onClick={() => handleEditBudget(budget)}>
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No budgets found. Please add a new budget below.</p>
      )}

      {/* Add / Edit Budget Form */}
      <h3 className="margin-top">{editingBudget ? "Edit Budget" : "Add New Budget"}</h3>
      <p className="instructions">
        {editingBudget
          ? "Update the details of your selected budget and click 'Update Budget'."
          : "Fill out the form below to create a new budget."}
      </p>
      <div className="budget-form-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        />
        <label htmlFor="limit">Budget Limit</label>
        <input
          id="limit"
          type="number"
          value={newBudget.limit}
          onChange={(e) => setNewBudget({ ...newBudget, limit: Number(e.target.value) })}
        />
        <label htmlFor="spent">Amount Spent</label>
        <input
          id="spent"
          type="number"
          value={newBudget.spent}
          onChange={(e) => setNewBudget({ ...newBudget, spent: Number(e.target.value) })}
        />
        <button
          className={`budget-btn ${editingBudget ? "budget-btn-primary" : "budget-btn-success"} margin-top`}
          onClick={editingBudget ? handleUpdateBudget : handleAddBudget}
        >
          {editingBudget ? "Update Budget" : "Add Budget"}
        </button>
        {editingBudget && (
          <button
            className="budget-btn budget-btn-secondary margin-top margin-left"
            onClick={() => {
              setEditingBudget(null);
              setNewBudget({ category: "", limit: 0, spent: 0 });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Budget Summary */}
      <h3 className="margin-top">Budget Summary</h3>
      <p className="instructions">
        This summary provides an overview of each budget category including the set limits and amounts spent.
      </p>
      <ul className="budget-list">
        {summary.map((item, index) => (
          <li key={index} className="budget-list-item">
            {item.category}: Limit - {item.limit}, Spent - {item.spent}
          </li>
        ))}
      </ul>

      {/* Budget Performance */}
      <h3 className="margin-top">Budget Performance</h3>
      <p className="instructions">
        Review your budget performance here. This section shows the remaining amount for each category.
      </p>
      <ul className="budget-list">
        {performance.map((item, index) => (
          <li key={index} className="budget-list-item">
            {item.category}: Remaining - {item.remaining}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;
