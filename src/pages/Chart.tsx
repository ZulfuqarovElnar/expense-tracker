import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const data = {
    labels: expenses.map(expense => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(expense => expense.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default Chart;
