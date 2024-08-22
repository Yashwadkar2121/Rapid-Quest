// src/components/CustomerDistributionChart.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CustomerDistributionChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "rapid-quest-dashboard-kappa.vercel.app/customer-distribution"
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
      }
    };

    fetchData();
  }, []);

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
