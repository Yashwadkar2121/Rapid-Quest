// src/components/CustomerDistributionChart.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CustomerDistributionChart = () => {
  const [chartData, setChartData] = useState(null);

  // Fetch the API URL from environment variables
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

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
              backgroundColor: data.map(
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 0.6)`
              ),
              borderColor: data.map(
                () =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                    Math.random() * 255
                  )}, ${Math.floor(Math.random() * 255)}, 1)`
              ),
              borderWidth: 1,
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
        <Pie data={chartData} options={{ responsive: true }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerDistributionChart;
