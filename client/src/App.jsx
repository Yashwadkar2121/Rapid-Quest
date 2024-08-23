import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesChart from "./components/SalesChart";
import SalesGrowthRateChart from "./components/SalesGrowthRateChart";
import NewCustomersAdded from "./components/NewCustomersAdded";
import CustomerDistributionChart from "./components/CustomerDistributionChart";
import NumberRepeatCustomers from "./components/NumberRepeatCustomers";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="p-3 md:p-20 md:mt-10 ">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/sales-over-time" element={<SalesChart />}></Route>
            <Route
              path="/sales-growth-rate"
              element={<SalesGrowthRateChart />}
            ></Route>
            <Route
              path="/new-customers"
              element={<NewCustomersAdded />}
            ></Route>
            <Route
              path="/distribution-customers"
              element={<CustomerDistributionChart />}
            ></Route>
            <Route
              path="/repeat-customers"
              element={<NumberRepeatCustomers />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
