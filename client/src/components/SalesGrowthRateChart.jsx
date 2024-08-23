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
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGrowthRate = ({ chartType }) => {
  const [dailyGrowthRate, setDailyGrowthRate] = useState([]);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState([]);
  const [quarterlyGrowthRate, setQuarterlyGrowthRate] = useState([]);
  const [yearlyGrowthRate, setYearlyGrowthRate] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the API URL from environment variables
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/analytics/sales-growth-rate`
        );
        setDailyGrowthRate(response.data.dailyGrowthRate || []);
        setMonthlyGrowthRate(response.data.monthlyGrowthRate || []);
        setQuarterlyGrowthRate(response.data.quarterlyGrowthRate || []);
        setYearlyGrowthRate(response.data.yearlyGrowthRate || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading state whether there's an error or not
      }
    };

    fetchData();
  }, [BASE_URL]);

  const formatChartData = (data, labelKey, dataKey) => {
    if (!data) {
      return {
        labels: [],
        datasets: [],
      };
    }
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

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  return (
    <div>
      
      <h1 className="text-center text-2xl font-medium mt-5">
        Sales Growth Rate Visualization
      </h1>

      {(chartType === "daily" || !chartType) && dailyGrowthRate.length > 0 && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">Daily Growth Rate</h2>
          <Bar data={dailyChartData} options={{ responsive: true }} />
        </div>
      )}

      {(chartType === "monthly" || !chartType) &&
        monthlyGrowthRate.length > 0 && (
          <div className="my-5">
            <h2 className="text-xl font-medium text-center">
              Monthly Growth Rate
            </h2>
            <Bar data={monthlyChartData} options={{ responsive: true }} />
          </div>
        )}

      {(chartType === "quarterly" || !chartType) &&
        quarterlyGrowthRate.length > 0 && (
          <div className="my-5">
            <h2 className="text-xl font-medium text-center">
              Quarterly Growth Rate
            </h2>
            <Bar data={quarterlyChartData} options={{ responsive: true }} />
          </div>
        )}

      {(chartType === "yearly" || !chartType) &&
        yearlyGrowthRate.length > 0 && (
          <div className="my-5">
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
