import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const [dailyData, setDailyData] = useState({ labels: [], datasets: [] });
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [quarterlyData, setQuarterlyData] = useState({
    labels: [],
    datasets: [],
  });
  const [yearlyData, setYearlyData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/sales-over-time")
      .then((response) => {
        setDailyData(
          formatChartData(response.data.dailySales, "date", "Total Sales")
        );
        setMonthlyData(
          formatChartData(response.data.monthlySales, "month", "Total Sales")
        );
        setQuarterlyData(
          formatChartData(
            response.data.quarterlySales,
            "quarter",
            "Total Sales"
          )
        );
        setYearlyData(
          formatChartData(response.data.yearlySales, "year", "Total Sales")
        );
      })
      .catch((error) => {
        console.error("Error fetching the sales data", error);
      });
  }, []);

  const formatChartData = (data, labelKey, dataKey) => {
    return {
      labels: data?.map((item) => item[labelKey]) || [],
      datasets: [
        {
          label: dataKey,
          data: data?.map((item) => item.totalSales) || [],
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      <h2>Daily Sales Over Time</h2>
      <Line data={dailyData} />

      <h2>Monthly Sales Over Time</h2>
      <Line data={monthlyData} />

      <h2>Quarterly Sales Over Time</h2>
      <Line data={quarterlyData} />

      <h2>Yearly Sales Over Time</h2>
      <Line data={yearlyData} />
    </div>
  );
};

export default SalesChart;
