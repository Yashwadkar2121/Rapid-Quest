import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesChart from "./components/SalesChart";
import SalesGrowthRateChart from "./components/SalesGrowthRateChart";
import NewCustomersAdded from "./components/NewCustomersAdded";
import CustomerDistributionChart from "./components/CustomerDistributionChart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sales-over-time" element={<SalesChart />}></Route>
        <Route
          path="/sales-growth-rate"
          element={<SalesGrowthRateChart />}
        ></Route>
        <Route path="/new-customers" element={<NewCustomersAdded />}></Route>
        <Route
          path="/distribution-customers"
          element={<CustomerDistributionChart />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
