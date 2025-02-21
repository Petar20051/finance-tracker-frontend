import React, { useState, useEffect } from "react";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalSuggestions,
} from "../api/goals";


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
      setError("Failed to fetch goals.");
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGoalSuggestions = async () => {
    try {
      const suggestions = await getGoalSuggestions();
      console.log("Fetched suggestions:", suggestions); 
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
      setError("Failed to create goal.");
      console.error("Error creating goal:", err);
    }
  };

  const handleUpdateGoal = async () => {
    if (!editingGoal || !editingGoal.id) {
      setError("Invalid goal ID.");
      console.error("Update failed: Invalid ID.");
      return;
    }
    try {
      await updateGoal(editingGoal.id, newGoal);
      setEditingGoal(null);
      setNewGoal({ title: "", category: "", targetAmount: 0, deadline: "" });
      fetchGoals();
    } catch (err) {
      setError("Failed to update goal.");
      console.error("Error updating goal:", err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      fetchGoals();
    } catch (err) {
      setError("Failed to delete goal.");
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
    <div className="container mt-4">
      <h2 className="text-center">Goals</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <h3 className="mt-4">Goal List</h3>
      {loading ? (
        <div>Loading...</div>
      ) : goals.length > 0 ? (
        <ul className="list-group">
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <strong>{goal.title}</strong>: {goal.category}, Target -{" "}
                {goal.targetAmount}, Deadline - {new Date(goal.deadline).toDateString()}
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditGoal(goal)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals found.</p>
      )}

      <h3 className="mt-4">{editingGoal ? "Edit Goal" : "Add New Goal"}</h3>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
        />
        <label>Category</label>
        <input
          type="text"
          className="form-control"
          value={newGoal.category}
          onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
        />
        <label>Target Amount</label>
        <input
          type="number"
          className="form-control"
          value={newGoal.targetAmount}
          onChange={(e) =>
            setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })
          }
        />
        <label>Deadline</label>
        <label>Deadline</label>
<input
  type="date"
  className="form-control"
  value={
    newGoal.deadline
      ? new Date(newGoal.deadline).toISOString().split("T")[0] 
      : ""
  }
  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
/>

        <button
          className={`btn ${editingGoal ? "btn-primary" : "btn-success"} mt-3`}
          onClick={editingGoal ? handleUpdateGoal : handleCreateGoal}
        >
          {editingGoal ? "Update Goal" : "Add Goal"}
        </button>
        {editingGoal && (
          <button
            className="btn btn-secondary mt-3 ml-2"
            onClick={() => setEditingGoal(null)}
          >
            Cancel
          </button>
        )}
      </div>

      <h3 className="mt-4">Goal Suggestions</h3>
<button className="btn btn-info mb-3" onClick={fetchGoalSuggestions}>
  Fetch Suggestions
</button>
{Array.isArray(suggestedGoals) && suggestedGoals.length > 0 ? (
  <ul className="list-group">
    {suggestedGoals.map((suggestion, index) => (
      <li key={index} className="list-group-item">
        Category: {suggestion.title || "Untitled Goal"}, Target:{" "}
        {suggestion.targetAmount !== undefined
          ? suggestion.targetAmount
          : "N/A"}, Deadline:{" "}
        {suggestion.deadline
          ? new Date(suggestion.deadline).toDateString()
          : "No deadline specified"}
      </li>
    ))}
  </ul>
) : (
  <p>No suggestions available. Click "Fetch Suggestions" to get started.</p>
)}

    </div>
  );
};

export default GoalsPage;
