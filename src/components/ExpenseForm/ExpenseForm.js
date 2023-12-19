import React, { useEffect, useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, editExpense, expenseToUpdate }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (expenseToUpdate) {
      expenseTextInput.current.value = expenseToUpdate.text;
      expenseAmountInput.current.value = expenseToUpdate.amount;
      setIsEditing(true);
    } else {
      clearInput();
      setIsEditing(false);
    }
  }, [expenseToUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: isEditing ? expenseToUpdate.id : new Date().getTime(),
    };

    if (isEditing) {
      editExpense(expense);
    } else {
      addExpense(expense);
    }

    clearInput();
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{isEditing ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {isEditing ? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
