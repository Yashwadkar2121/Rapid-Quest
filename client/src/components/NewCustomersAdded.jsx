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

const NewCustomersAdded = ({ chartToDisplay }) => {
  const [dailyData, setDailyData] = useState({ labels: [], datasets: [] });
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [quarterlyData, setQuarterlyData] = useState({
    labels: [],
    datasets: [],
  });
  const [yearlyData, setYearlyData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rapid-quest-server.onrender.com/new-customers"
        );
        const {
          dailyCustomers = [],
          monthlyCustomers = [],
          quarterlyCustomers = [],
          yearlyCustomers = [],
        } = response.data;

        // Format the data
        setDailyData(formatChartData(dailyCustomers, "date", "newCustomers"));
        setMonthlyData(
          formatChartData(monthlyCustomers, "month", "newCustomers")
        );
        setQuarterlyData(
          formatChartData(quarterlyCustomers, "quarter", "newCustomers")
        );
        setYearlyData(formatChartData(yearlyCustomers, "year", "newCustomers"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatChartData = (
    data = [],
    labelKey = "label",
    dataKey = "value"
  ) => {
    return {
      labels: data.map((item) => item[labelKey] || ""),
      datasets: [
        {
          label: `Number of ${dataKey}`,
          data: data.map((item) => parseFloat(item[dataKey]) || 0),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-medium mt-5">
        Customer Data Visualization
      </h1>

      {(chartToDisplay === "daily" || !chartToDisplay) && (
        <div className="my-5 ">
          <h2 className="text-xl font-medium text-center">
            Daily New Customers
          </h2>
          <Bar data={dailyData} options={{ responsive: true }} />
        </div>
      )}

      {(chartToDisplay === "monthly" || !chartToDisplay) && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">
            Monthly New Customers
          </h2>
          <Bar data={monthlyData} options={{ responsive: true }} />
        </div>
      )}

      {(chartToDisplay === "quarterly" || !chartToDisplay) && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">
            Quarterly New Customers
          </h2>
          <Bar data={quarterlyData} options={{ responsive: true }} />
        </div>
      )}

      {(chartToDisplay === "yearly" || !chartToDisplay) && (
        <div className="my-5">
          <h2 className="text-xl font-medium text-center">
            Yearly New Customers
          </h2>
          <Bar data={yearlyData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

NewCustomersAdded.propTypes = {
  chartToDisplay: PropTypes.string, // Define prop type for chartToDisplay
};

export default NewCustomersAdded;
