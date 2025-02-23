import React from "react";
import "../styles/ExpenseList.css";

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <p className="no-expenses">No expenses available.</p>;
  }

  return (
    <div className="expense-list-container">
      <h2 className="expense-list-title">Your Expenses</h2>
      <p className="list-description">
        Review your expenses below. Use the "Update" button to edit an expense or "Delete" to remove it.
      </p>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <span className="expense-details">
              <strong>{expense.category}</strong> - {expense.amount.toFixed(2)} - {expense.description}
            </span>
            <div className="expense-actions">
              <button
                className="btn btn-update"
                onClick={() => onUpdate(expense)}
              >
                Update
              </button>
              <button
                className="btn btn-delete"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
