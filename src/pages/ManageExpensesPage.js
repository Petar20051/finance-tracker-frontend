import React, { useState, useEffect } from "react";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../api/expense";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";


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
        console.log("Updating expense:", { id: editingExpense.id, expense }); 

       
        const expenseWithNumericId = { ...expense, id: editingExpense.id };
        await updateExpense(editingExpense.id, expenseWithNumericId);
        setEditingExpense(null); 
      } else {
        console.log("Adding new expense:", expense); 
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
    console.log("Editing expense:", expense); 
    setEditingExpense(expense); 
  };

  
  const cancelEditing = () => {
    setEditingExpense(null); 
  };

  if (loading) {
    return <p>Loading expenses...</p>;
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div>
      <h1>Manage Expenses</h1>
      <AddExpenseForm
        onSubmit={handleAddOrUpdateExpense} 
        editingExpense={editingExpense} 
        cancelEditing={cancelEditing} 
      />
      <ExpenseList
        expenses={expenses} 
        onDelete={handleDeleteExpense} 
        onUpdate={startEditing} 
      />
    </div>
  );
};

export default ManageExpensesPage;
