import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeExpense } from '../store/expensesSlice';

const Expenses: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    dispatch(removeExpense(id));
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Calculate monthly totals and expense data
  const getMonthlyTotals = () => {
    const monthlyTotals: { [key: string]: number } = {};
    const monthlyExpenses: { [key: string]: Array<{ id: string; description: string; amount: number; date: string }> } = {};

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // "YYYY-MM"
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
        monthlyExpenses[monthYear] = [];
      }
      monthlyTotals[monthYear] += expense.amount;
      monthlyExpenses[monthYear].push(expense);
    });

    return { monthlyTotals, monthlyExpenses };
  };

  const { monthlyTotals, monthlyExpenses } = getMonthlyTotals();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>
      
      {/* Monthly Selector */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Select Month</h2>
        <ul>
          {Object.keys(monthlyTotals).map(monthYear => (
            <li key={monthYear} className="mb-2">
              <button
                onClick={() => setSelectedMonth(monthYear)}
                className={`p-2 rounded ${selectedMonth === monthYear ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {new Date(`${monthYear}-01`).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Expenses List */}
      {selectedMonth ? (
        <>
          <ul>
            {monthlyExpenses[selectedMonth].map(expense => (
              <li key={expense.id} className="mb-4">
                <div className="flex justify-between items-center p-4 bg-white shadow-md rounded">
                  <div>
                    <p className="font-bold text-lg">{expense.description}</p>
                    <p className="text-gray-700">${expense.amount.toFixed(2)}</p>
                    <p className="text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => handleRemove(expense.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Display monthly total */}
          <div className="bg-white p-4 shadow-md rounded mt-6">
            <h2 className="text-xl font-bold mb-2">Total for {new Date(`${selectedMonth}-01`).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <p className="text-lg">${monthlyTotals[selectedMonth].toFixed(2)}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Select a month to view expenses.</p>
      )}
      
      {/* Display total expenses */}
      <div className="bg-white p-4 shadow-md rounded mt-6">
        <h2 className="text-xl font-bold mb-2">Total Expenses</h2>
        <p className="text-lg">${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Expenses;
