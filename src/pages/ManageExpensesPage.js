import React, { useState, useEffect } from "react";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../api/expense";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";
import "../styles/ManageExpensesPage.css";

const ManageExpensesPage = () => {
  const [expenses, setExpenses] = useState([]); 
  const [editingExpense, setEditingExpense] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true); 
      const response = await getExpenses();
      setExpenses(response); 
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses.");
    } finally {
      setLoading(false); 
    }
  };

  const handleAddOrUpdateExpense = async (expense) => {
    try {
      if (editingExpense && editingExpense.id) {
        // Updating an existing expense
        const expenseWithNumericId = { ...expense, id: editingExpense.id };
        await updateExpense(editingExpense.id, expenseWithNumericId);
        setEditingExpense(null); 
      } else {
        // Adding a new expense
        await addExpense(expense);
      }
      fetchExpenses(); 
    } catch (error) {
      console.error("Error adding/updating expense:", error);
      setError("Error adding/updating expense: " + error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      if (!id || isNaN(Number(id))) {
        throw new Error("Expense ID must be a valid number.");
      }
      await deleteExpense(Number(id));
      fetchExpenses(); 
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError("Error deleting expense: " + error.message);
    }
  };

  const startEditing = (expense) => {
    setEditingExpense(expense); 
  };

  const cancelEditing = () => {
    setEditingExpense(null); 
  };

  return (
    <div className="manage-expenses-page">
      <h1>Manage Your Expenses</h1>
      <p className="page-description">
        Use the form below to add a new expense or update an existing one. Your expenses are listed below, and you can easily edit or delete any entry.
      </p>
      {error && <div className="error-alert">{error}</div>}
      <section className="expense-form-section">
        <AddExpenseForm
          onSubmit={handleAddOrUpdateExpense}
          editingExpense={editingExpense}
          cancelEditing={cancelEditing}
        />
      </section>
      <section className="expense-list-section">
        {loading ? (
          <p>Loading expenses...</p>
        ) : expenses.length > 0 ? (
          <ExpenseList
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onUpdate={startEditing}
          />
        ) : (
          <p className="no-expenses">No expenses available. Please add an expense above.</p>
        )}
      </section>
    </div>
  );
};

export default ManageExpensesPage;
