import SalesChart from "./SalesChart";
import SalesGrowthRate from "./SalesGrowthRateChart";
import NewCustomersAdded from "./NewCustomersAdded";
import CustomerDistributionChart from "./CustomerDistributionChart";
import NumberRepeatCustomers from "./NumberRepeatCustomers";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="font-bold text-5xl text-center">Home Component</h1>
      <div className="flex justify-between items-center  gap-5">
        <div className="w-6/12">
          <Link to="/sales-over-time">
            <SalesChart chartType="monthly" />
          </Link>
        </div>
        <div className="w-6/12">
          <Link to="/sales-growth-rate">
            {" "}
            <SalesGrowthRate chartType="daily" />
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center  gap-5">
        <div className="w-6/12">
          <Link to="/new-customers">
            <NewCustomersAdded chartToDisplay="yearly" />
          </Link>
        </div>
        <div className="w-6/12">
          <Link to="/distribution-customers">
            <CustomerDistributionChart />
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5">
        <div className="w-6/12">
          <Link to="/repeat-customers">
            <NumberRepeatCustomers timeFrame="monthly" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
