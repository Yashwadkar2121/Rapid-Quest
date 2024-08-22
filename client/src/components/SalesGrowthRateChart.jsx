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
import PropTypes from "prop-types";
const SalesGrowthRate = ({ chartType = "daily" }) => {
  const [dailyGrowthRate, setDailyGrowthRate] = useState([]);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState([]);
  const [quarterlyGrowthRate, setQuarterlyGrowthRate] = useState([]);
  const [yearlyGrowthRate, setYearlyGrowthRate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rapid-quest-server.onrender.com/sales-growth-rate"
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
      <h1 className="text-center text-2xl font-medium mt-5">
        Sales Growth Rate Visualization
      </h1>

      {chartType === "daily" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">Daily Growth Rate</h2>
          <Bar data={dailyChartData} options={{ responsive: true }} />
        </div>
      )}

      {chartType === "monthly" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Monthly Growth Rate
          </h2>
          <Bar data={monthlyChartData} options={{ responsive: true }} />
        </div>
      )}

      {chartType === "quarterly" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Quarterly Growth Rate
          </h2>
          <Bar data={quarterlyChartData} options={{ responsive: true }} />
        </div>
      )}

      {chartType === "yearly" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Yearly Growth Rate
          </h2>
          <Bar data={yearlyChartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};
SalesGrowthRate.propTypes = {
  chartType: PropTypes.string,
};
export default SalesGrowthRate;
