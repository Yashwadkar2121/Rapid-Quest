import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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

const NumberRepeatCustomers = ({ timeFrame }) => {
  const [chartData, setChartData] = useState({});

  // Fetch the API URL from environment variables
  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/analytics/repeat-customers`
        );
        const data = response.data;

        const parsedData = {
          daily: { labels: [], data: [] },
          monthly: { labels: [], data: [] },
          quarterly: { labels: [], data: [] },
          yearly: { labels: [], data: [] },
        };

        data.forEach((timeFrameData) => {
          const { timeFrame: frame, data: ordersData } = timeFrameData;
          ordersData.forEach((item) => {
            const orders = item.orders;
            orders.forEach((order) => {
              if (frame === "daily") {
                parsedData.daily.labels.push(order.date);
                parsedData.daily.data.push(order.count);
              } else if (frame === "monthly") {
                parsedData.monthly.labels.push(order.month);
                parsedData.monthly.data.push(order.count);
              } else if (frame === "quarterly") {
                parsedData.quarterly.labels.push(
                  `${order.year} ${order.quarter}`
                );
                parsedData.quarterly.data.push(order.count);
              } else if (frame === "yearly") {
                parsedData.yearly.labels.push(order.year);
                parsedData.yearly.data.push(order.count);
              }
            });
          });
        });

        setChartData({
          daily: {
            labels: parsedData.daily.labels,
            datasets: [
              {
                label: "Daily Orders",
                data: parsedData.daily.data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          monthly: {
            labels: parsedData.monthly.labels,
            datasets: [
              {
                label: "Monthly Orders",
                data: parsedData.monthly.data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          quarterly: {
            labels: parsedData.quarterly.labels,
            datasets: [
              {
                label: "Quarterly Orders",
                data: parsedData.quarterly.data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          yearly: {
            labels: parsedData.yearly.labels,
            datasets: [
              {
                label: "Yearly Orders",
                data: parsedData.yearly.data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [BASE_URL]);

  return (
    <div>
      
      <h1 className="text-center text-2xl font-medium mt-5">
        Number of Repeat Customers
      </h1>

      {(timeFrame === "daily" || !timeFrame) && chartData.daily && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">Daily Orders</h2>
          <Bar data={chartData.daily} options={{ responsive: true }} />
        </div>
      )}

      {(timeFrame === "monthly" || !timeFrame) && chartData.monthly && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">Monthly Orders</h2>
          <Bar data={chartData.monthly} options={{ responsive: true }} />
        </div>
      )}

      {(timeFrame === "quarterly" || !timeFrame) && chartData.quarterly && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">Quarterly Orders</h2>
          <Bar data={chartData.quarterly} options={{ responsive: true }} />
        </div>
      )}

      {(timeFrame === "yearly" || !timeFrame) && chartData.yearly && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">Yearly Orders</h2>
          <Bar data={chartData.yearly} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

NumberRepeatCustomers.propTypes = {
  timeFrame: PropTypes.string,
};

export default NumberRepeatCustomers;
