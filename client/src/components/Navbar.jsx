import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div>
      <ul className="flex border-b justify-around">
        <li className="mr-1">
          <Link
            className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
              location.pathname === "/" ? "bg-blue-500 text-white " : ""
            }`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="mr-1">
          <Link
            className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
              location.pathname === "/sales-over-time"
                ? "bg-blue-500 text-white"
                : ""
            }`}
            to="/sales-over-time"
          >
            SalesChart
          </Link>
        </li>
        <li className="mr-1">
          <Link
            className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
              location.pathname === "/sales-growth-rate"
                ? "bg-blue-500 text-white"
                : ""
            }`}
            to="/sales-growth-rate"
          >
            SalesGrowthRateChart
          </Link>
        </li>
        <li className="mr-1">
          <Link
            className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
              location.pathname === "/new-customers"
                ? "bg-blue-500 text-white"
                : ""
            }`}
            to="/new-customers"
          >
            NewCustomersAdded
          </Link>
        </li>
        <li className="mr-1">
          <Link
            className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
              location.pathname === "/repeat-customers"
                ? "bg-blue-500 text-white"
                : ""
            }`}
            to="/repeat-customers"
          >
            NumberRepeatCustomers
          </Link>
        </li>
        <li className="mr-1">
          <Link
            className={`bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
              location.pathname === "/distribution-customers"
                ? "bg-blue-500 text-white"
                : ""
            }`}
            to="/distribution-customers"
          >
            CustomerDistributionChart
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
