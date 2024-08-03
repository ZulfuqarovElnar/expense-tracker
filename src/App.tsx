// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import AddExpense from './pages/AddExpense';
import Expenses from './pages/Expenses';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AddExpense />} />
      <Route path="/expenses" element={<Expenses />} />
    </Routes>
  );
};

export default App;

