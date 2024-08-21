import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGrowthRate = () => {
  const [dailyGrowthRate, setDailyGrowthRate] = useState([]);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState([]);
  const [quarterlyGrowthRate, setQuarterlyGrowthRate] = useState([]);
  const [yearlyGrowthRate, setYearlyGrowthRate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/analytics/sales-growth-rate"
        );
        console.log(response.data); // Log the response to verify structure
        setDailyGrowthRate(response.data.dailyGrowthRate || []);
        setMonthlyGrowthRate(response.data.monthlyGrowthRate || []);
        setQuarterlyGrowthRate(response.data.quarterlyGrowthRate || []);
        setYearlyGrowthRate(response.data.yearlyGrowthRate || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatChartData = (data, labelKey, dataKey) => {
    return {
      labels: data.map((item) => item[labelKey] || ""),
      datasets: [
        {
          label: `Growth Rate (%)`,
          data: data.map((item) => parseFloat(item[dataKey])),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
        },
      ],
    };
  };

  const dailyChartData = formatChartData(dailyGrowthRate, "date", "growthRate");
  const monthlyChartData = formatChartData(
    monthlyGrowthRate,
    "month",
    "growthRate"
  );
  const quarterlyChartData = formatChartData(
    quarterlyGrowthRate,
    "quarter",
    "growthRate"
  );
  const yearlyChartData = formatChartData(
    yearlyGrowthRate,
    "year",
    "growthRate"
  );

  return (
    <div>
      <h1>Sales Growth Rate Visualization</h1>

      <div>
        <h2>Daily Growth Rate</h2>
        <Bar data={dailyChartData} options={{ responsive: true }} />
      </div>

      <div>
        <h2>Monthly Growth Rate</h2>
        <Bar data={monthlyChartData} options={{ responsive: true }} />
      </div>

      <div>
        <h2>Quarterly Growth Rate</h2>
        <Bar data={quarterlyChartData} options={{ responsive: true }} />
      </div>

      <div>
        <h2>Yearly Growth Rate</h2>
        <Bar data={yearlyChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default SalesGrowthRate;
  