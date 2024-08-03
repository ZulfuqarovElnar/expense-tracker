import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-center gap-10">
        <Link to="/" className="text-white">Add Expense</Link>
        <Link to="/expenses" className="text-white">Expenses</Link>
      </div>
    </nav>
  );
}

export default Navbar;
