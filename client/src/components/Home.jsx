import SalesChart from "./SalesChart";
import SalesGrowthRate from "./SalesGrowthRateChart";
import NewCustomersAdded from "./NewCustomersAdded";
import CustomerDistributionChart from "./CustomerDistributionChart";
import NumberRepeatCustomers from "./NumberRepeatCustomers";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="font-bold text-xl md:text-5xl text-center mb-5">
        Transforming Shopify Data into Actionable Insights with Real-Time
        Visualizations
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-5">
        <div className="w-full md:w-1/2">
          <Link to="/sales-over-time">
            <SalesChart chartType="monthly" />
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <Link to="/sales-growth-rate">
            {" "}
            <SalesGrowthRate chartType="daily" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-5">
        <div className="w-full md:w-1/2">
          <Link to="/new-customers">
            <NewCustomersAdded chartToDisplay="yearly" />
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <Link to="/distribution-customers">
            <CustomerDistributionChart />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-5">
        <div className="w-full md:w-1/2">
          <Link to="/repeat-customers">
            <NumberRepeatCustomers timeFrame="yearly" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
