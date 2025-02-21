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
      setError("Failed to fetch data.");
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
        setBudgets(summary); 
      }
    } catch (err) {
      setError("Failed to filter budgets.");
      console.error("Error filtering budgets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setFilterCategory("");
    setBudgets(summary); 
  };

  const handleAddBudget = async () => {
    try {
      await addBudget(newBudget);
      setNewBudget({ category: "", limit: 0, spent: 0 });
      fetchAllData();
    } catch (err) {
      setError("Failed to add budget.");
      console.error("Error adding budget:", err);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await deleteBudget(id);
      fetchAllData();
    } catch (err) {
      setError("Failed to delete budget.");
      console.error("Error deleting budget:", err);
    }
  };

  const handleUpdateBudget = async () => {
    if (!editingBudget || !editingBudget.id) {
      setError("Invalid budget ID.");
      console.error("Update failed: Invalid ID.");
      return;
    }
    try {
      await updateBudget(editingBudget.id, newBudget);
      setEditingBudget(null);
      setNewBudget({ category: "", limit: 0, spent: 0 });
      fetchAllData();
    } catch (err) {
      setError("Failed to update budget.");
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
    <div className="container mt-4">
      <h2 className="text-center">Budgets</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group mt-3">
        <label>Filter Budgets</label>
        <input
          type="text"
          className="form-control"
          placeholder="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleFilterBudgets}>
          Apply Filter
        </button>
        <button className="btn btn-secondary mt-2 ml-2" onClick={handleClearFilter}>
          Clear Filter
        </button>
      </div>

      <h3 className="mt-4">Budget List</h3>
      {loading ? (
        <div>Loading...</div>
      ) : budgets.length > 0 ? (
        <ul className="list-group">
          {budgets.map((budget) => (
            <li
              key={budget.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <strong>{budget.category}</strong>: Limit - {budget.limit}, Spent -{" "}
                {budget.spent}
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => handleDeleteBudget(budget.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditBudget(budget)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No budgets found.</p>
      )}

      <h3 className="mt-4">{editingBudget ? "Edit Budget" : "Add New Budget"}</h3>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          className="form-control"
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        />
        <label>Limit</label>
        <input
          type="number"
          className="form-control"
          value={newBudget.limit}
          onChange={(e) => setNewBudget({ ...newBudget, limit: Number(e.target.value) })}
        />
        <label>Spent</label>
        <input
          type="number"
          className="form-control"
          value={newBudget.spent}
          onChange={(e) => setNewBudget({ ...newBudget, spent: Number(e.target.value) })}
        />
        <button
          className={`btn ${editingBudget ? "btn-primary" : "btn-success"} mt-3`}
          onClick={editingBudget ? handleUpdateBudget : handleAddBudget}
        >
          {editingBudget ? "Update Budget" : "Add Budget"}
        </button>
        {editingBudget && (
          <button
            className="btn btn-secondary mt-3 ml-2"
            onClick={() => {
              setEditingBudget(null);
              setNewBudget({ category: "", limit: 0, spent: 0 });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <h3 className="mt-4">Budget Summary</h3>
      <ul className="list-group">
        {summary.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.category}: Limit - {item.limit}, Spent - {item.spent}
          </li>
        ))}
      </ul>

      <h3 className="mt-4">Budget Performance</h3>
      <ul className="list-group">
        {performance.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.category}: Remaining - {item.remaining}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;
