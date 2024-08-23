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
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ chartType = "daily" }) => {
  const [dailyData, setDailyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [quarterlyData, setQuarterlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the API URL from environment variables
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/analytics/sales-over-time`
        );
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
      } catch (error) {
        console.error("Error fetching the sales data", error);
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
      <h1 className="text-center text-2xl font-medium mt-5">
        Total Sales Over Time
      </h1>
      {chartType === "daily" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Daily Sales Over Time
          </h2>
          <Line data={dailyData} />
        </div>
      )}
      {chartType === "monthly" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Monthly Sales Over Time
          </h2>
          <Line data={monthlyData} />
        </div>
      )}
      {chartType === "quarterly" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Quarterly Sales Over Time
          </h2>
          <Line data={quarterlyData} />
        </div>
      )}
      {chartType === "yearly" && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Yearly Sales Over Time
          </h2>
          <Line data={yearlyData} />
        </div>
      )}
    </div>
  );
};

SalesChart.propTypes = {
  chartType: PropTypes.string,
};

export default SalesChart;
