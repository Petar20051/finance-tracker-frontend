import React, { useState, useEffect } from "react";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalSuggestions,
} from "../api/goals";
import "../styles/GoalsPage.css";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "",
    targetAmount: 0,
    deadline: "",
  });
  const [editingGoal, setEditingGoal] = useState(null);
  const [suggestedGoals, setSuggestedGoals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const data = await getGoals();
      setGoals(data || []);
    } catch (err) {
      setError("Failed to fetch goals. Please refresh the page or try again later.");
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGoalSuggestions = async () => {
    try {
      const suggestions = await getGoalSuggestions();
      setSuggestedGoals(suggestions || []);
    } catch (err) {
      setError("Failed to fetch goal suggestions.");
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleCreateGoal = async () => {
    try {
      await createGoal(newGoal);
      setNewGoal({ title: "", category: "", targetAmount: 0, deadline: "" });
      fetchGoals();
    } catch (err) {
      setError("Failed to create goal. Please check your input and try again.");
      console.error("Error creating goal:", err);
    }
  };

  const handleUpdateGoal = async () => {
    if (!editingGoal || !editingGoal.id) {
      setError("Invalid goal selected for update.");
      console.error("Update failed: Invalid ID.");
      return;
    }
    try {
      await updateGoal(editingGoal.id, newGoal);
      setEditingGoal(null);
      setNewGoal({ title: "", category: "", targetAmount: 0, deadline: "" });
      fetchGoals();
    } catch (err) {
      setError("Failed to update goal. Please try again.");
      console.error("Error updating goal:", err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      fetchGoals();
    } catch (err) {
      setError("Failed to delete goal. Please try again later.");
      console.error("Error deleting goal:", err);
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      category: goal.category,
      targetAmount: goal.targetAmount,
      deadline: goal.deadline,
    });
  };

  return (
    <div className="goals-page">
      <h2 className="goals-title">Your Goals</h2>
      <p className="page-description">
        Manage your financial goals here. You can add new goals, update existing ones, and get suggestions for setting effective targets.
      </p>
      {error && <div className="error-alert">{error}</div>}

      {/* Goal List Section */}
      <section className="goals-section">
        <h3 className="section-title">Goal List</h3>
        <p className="section-description">
          Review your current goals below. You can edit or delete any goal as needed.
        </p>
        {loading ? (
          <div className="loading">Loading goals...</div>
        ) : goals.length > 0 ? (
          <ul className="goal-list">
            {goals.map((goal) => (
              <li key={goal.id} className="goal-item">
                <div className="goal-info">
                  <strong>{goal.title}</strong>: {goal.category}, Target - {goal.targetAmount}, Deadline -{" "}
                  {new Date(goal.deadline).toDateString()}
                </div>
                <div className="goal-actions">
                  <button className="btn-danger" onClick={() => handleDeleteGoal(goal.id)}>
                    Delete
                  </button>
                  <button className="btn-primary" onClick={() => handleEditGoal(goal)}>
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-goals">No goals found. Start by adding a new goal below.</p>
        )}
      </section>

      {/* Add / Edit Goal Section */}
      <section className="goal-form-section">
        <h3 className="section-title">
          {editingGoal ? "Edit Your Goal" : "Add a New Goal"}
        </h3>
        <p className="section-description">
          {editingGoal
            ? "Modify the details of your selected goal and click 'Update Goal'."
            : "Fill out the form below to create a new goal."}
        </p>
        <div className="goal-form">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-input"
            value={newGoal.category}
            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
          />
          <label className="form-label">Target Amount</label>
          <input
            type="number"
            className="form-input"
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
          />
          <label className="form-label">Deadline</label>
          <input
            type="date"
            className="form-input"
            value={newGoal.deadline ? new Date(newGoal.deadline).toISOString().split("T")[0] : ""}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          />
          <button
            className={`form-btn ${editingGoal ? "btn-primary" : "btn-success"}`}
            onClick={editingGoal ? handleUpdateGoal : handleCreateGoal}
          >
            {editingGoal ? "Update Goal" : "Add Goal"}
          </button>
          {editingGoal && (
            <button
              className="form-btn btn-secondary"
              onClick={() => {
                setEditingGoal(null);
                setNewGoal({ title: "", category: "", targetAmount: 0, deadline: "" });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      {/* Goal Suggestions Section */}
      <section className="goal-suggestions-section">
        <h3 className="section-title">Goal Suggestions</h3>
        <p className="section-description">
          Not sure where to start? Click the button below to fetch suggestions based on current trends.
        </p>
        <button className="suggest-btn" onClick={fetchGoalSuggestions}>
          Fetch Suggestions
        </button>
        {Array.isArray(suggestedGoals) && suggestedGoals.length > 0 ? (
          <ul className="goal-suggestions">
            {suggestedGoals.map((suggestion, index) => (
              <li key={index} className="suggestion-item">
                <strong>{suggestion.title || "Untitled Goal"}</strong> — Target:{" "}
                {suggestion.targetAmount !== undefined ? suggestion.targetAmount : "N/A"}, Deadline:{" "}
                {suggestion.deadline ? new Date(suggestion.deadline).toDateString() : "No deadline specified"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-suggestions">
            No suggestions available. Click "Fetch Suggestions" to get started.
          </p>
        )}
      </section>
    </div>
  );
};

export default GoalsPage;
