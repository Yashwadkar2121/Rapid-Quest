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
  const [dailyData, setDailyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [quarterlyData, setQuarterlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error("Error fetching the sales data", error);
        setLoading(false); // End loading state even if there's an error
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

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div>
      <h2>Daily Sales Over Time</h2>
      {dailyData && <Line data={dailyData} />}

      <h2>Monthly Sales Over Time</h2>
      {monthlyData && <Line data={monthlyData} />}

      <h2>Quarterly Sales Over Time</h2>
      {quarterlyData && <Line data={quarterlyData} />}

      <h2>Yearly Sales Over Time</h2>
      {yearlyData && <Line data={yearlyData} />}
    </div>
  );
};

export default SalesChart;
