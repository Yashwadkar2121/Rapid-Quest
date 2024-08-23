import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-500 text-white ">
      <div className="flex justify-between p-2 md:p-7 ">
        <h2 className="text-xl md:text-3xl lg:text-4xl">Dashboard</h2>
        {isOpen ? (
          <button onClick={handleOpen}>
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        ) : (
          <button onClick={handleOpen}>
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        )}
      </div>
      <ul
        className={`  ${
          isOpen
            ? "text-right min-h-screen p-2 md:p-7 flex flex-col justify-center pb-72"
            : "hidden"
        }`}
      >
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={` text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-800 font-semibold ${
              location.pathname === "/" ? "text-blue-600 " : ""
            }`}
            to="/"
            onClick={() => handleOpen()}
          >
            Home
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={` text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-800 font-semibold ${
              location.pathname === "/sales-over-time" ? "text-blue-600" : ""
            }`}
            to="/sales-over-time"
            onClick={() => handleOpen()}
          >
            Sales Chart
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={` text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-800 font-semibold ${
              location.pathname === "/sales-growth-rate" ? "text-blue-600" : ""
            }`}
            to="/sales-growth-rate"
            onClick={() => handleOpen()}
          >
            Growth Rate
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={` text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-800 font-semibold ${
              location.pathname === "/new-customers" ? "text-blue-600" : ""
            }`}
            to="/new-customers"
            onClick={() => handleOpen()}
          >
            New Customers
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={` text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-800 font-semibold ${
              location.pathname === "/repeat-customers" ? "text-blue-600" : ""
            }`}
            to="/repeat-customers"
            onClick={() => handleOpen()}
          >
            Repeat Customers
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={` text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-800 font-semibold ${
              location.pathname === "/distribution-customers"
                ? "text-blue-600"
                : ""
            }`}
            to="/distribution-customers"
            onClick={() => handleOpen()}
          >
            Distribution Chart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
