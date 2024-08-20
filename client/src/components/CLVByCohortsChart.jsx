import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchCLVByCohorts } from "../api";

const CLVByCohortsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCLVByCohorts();
      setChartData({
        labels: data.map((item) => item.cohort),
        datasets: [
          {
            label: "Customer Lifetime Value",
            data: data.map((item) => item.totalCLV),
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
          {
            label: "Average CLV",
            data: data.map((item) => item.averageCLV),
            borderColor: "rgba(153,102,255,1)",
            fill: false,
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Customer Lifetime Value by Cohorts</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CLVByCohortsChart;
