// src/components/CustomerDistributionChart.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement);

import Spinner from "./Spinner";

const CustomerDistributionChart = () => {
  const [chartData, setChartData] = useState(null);

  // Fetch the API URL from environment variables
  const BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/analytics/customer-distribution`
        );

        const data = response.data;

        setChartData({
          labels: data.map((item) => item.city),
          datasets: [
            {
              label: "Customer Distribution by City",
              data: data.map((item) => item.count),
              backgroundColor: data.map((item) => {
                if (item.count <= 1) {
                  return "rgba(255, 0, 0, 1)"; // Red color
                } else if (item.count >= 1 && item.count <= 5) {
                  return "rgba(255, 255, 0, 1)"; // Yellow color
                } else {
                  return "rgba(0, 128, 0, 1)"; // Green color
                }
              }),
              borderColor: "rgba(255, 255, 255, 1)", // White border color
              borderWidth: 1, // Border width
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(null); // Reset chart data to null
        alert("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [BASE_URL]);

  return (
    <div>
      <h1 className="text-center text-2xl font-medium my-5">
        Customer Distribution by City
      </h1>
      {chartData ? (
        <PolarArea data={chartData} options={{ responsive: true }} />
      ) : (
        <p className="flex justify-center items-center">
          <Spinner />
        </p>
      )}
    </div>
  );
};

export default CustomerDistributionChart;
