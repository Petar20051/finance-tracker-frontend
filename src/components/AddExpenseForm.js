import React, { useState, useEffect } from "react";
import "../styles/AddExpense.css";


const formatDate = (date) => {
  if (!date) return ""; 
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); 
  const day = String(d.getDate()).padStart(2, "0"); 
  return `${year}-${month}-${day}`;
};

const AddExpenseForm = ({ onSubmit, editingExpense, cancelEditing }) => {
  const [formState, setFormState] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormState({
        id: editingExpense.id || "", 
        category: editingExpense.category || "",
        amount: editingExpense.amount || "",
        description: editingExpense.description || "",
        date: formatDate(editingExpense.date), 
      });
    } else {
      setFormState({
        id: "",
        category: "",
        amount: "",
        description: "",
        date: "",
      });
    }
  }, [editingExpense]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.category || !formState.amount || !formState.date) {
      alert("Please fill in all required fields: Category, Amount, and Date.");
      return;
    }
    
    const { id, ...payload } = formState;
    payload.amount = parseFloat(payload.amount);
    
    onSubmit(payload);
   
    setFormState({
      category: "",
      amount: "",
      description: "",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>
      <p className="form-description">
        {editingExpense
          ? "Update the details of your expense and click 'Update Expense'."
          : "Enter the details of your expense below."}
      </p>
      <input
        type="text"
        name="category"
        value={formState.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="amount"
        value={formState.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <textarea
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Description (optional)"
      />
      <input
        type="date"
        name="date"
        value={formState.date}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
      {editingExpense && (
        <button type="button" onClick={cancelEditing} className="cancel-btn">
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddExpenseForm;
