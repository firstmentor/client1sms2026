import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultChart = ({ results = [] }) => {

  if (!results.length) return null;

  const labels = results.map((r) => r.subject?.name);
  const marks = results.map((r) => r.marksObtained);

  const data = {
    labels,
    datasets: [
      {
        label: "Marks",
        data: marks,
      },
    ],
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Performance Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default ResultChart;