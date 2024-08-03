import React, { useState } from 'react';
import { useAppDispatch } from '../store';
import { addExpense } from '../store/expensesSlice';

const ExpenseForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount && date) {
      dispatch(addExpense({ id: Date.now().toString(), description, amount: parseFloat(amount), date }));
      setDescription('');
      setAmount('');
      setDate('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[600px] my-10 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Add New Expense</h2>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
        <input 
          type="text" 
          id="description" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
        <input 
          type="number" 
          id="amount" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 mb-2">Date</label>
        <input 
          type="date" 
          id="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
