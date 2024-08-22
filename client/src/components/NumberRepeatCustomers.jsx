import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns"; // For date formatting

const NumberRepeatCustomers = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/analytics/repeat-customers"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result); // Log raw data to inspect format
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      }
    };

    fetchData();
  }, []);

  const getChartData = () => {
    if (!data) return {};

    const labels = data.map((customer) => {
      const date = new Date(customer.created_at);
      // Provide a fallback for invalid dates
      return isNaN(date) ? "Invalid date" : format(date, "MMM dd, yyyy");
    });
    const values = data.map((customer) => customer.orderCount);

    return {
      labels,
      datasets: [
        {
          label: "Repeat Customers",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div>
      <h2>Customer Repeat Purchases</h2>
      {error ? (
        <p>{error}</p>
      ) : data ? (
        <Bar data={getChartData()} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NumberRepeatCustomers;
