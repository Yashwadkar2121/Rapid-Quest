import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="text-white bg-[#1e3963]">
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
        className={` ${
          isOpen
            ? "text-right min-h-screen p-2 md:p-7 flex flex-col justify-center pb-72"
            : "hidden"
        }`}
      >
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={`text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-500 font-semibold ${
              location.pathname === "/" ? "text-blue-600" : ""
            }`}
            to="/"
            onClick={handleOpen}
          >
            Home
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={`text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-500 font-semibold ${
              location.pathname === "/sales-over-time" ? "text-blue-600" : ""
            }`}
            to="/sales-over-time"
            onClick={handleOpen}
          >
            Sales
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={`text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-500 font-semibold ${
              location.pathname === "/sales-growth-rate" ? "text-blue-600" : ""
            }`}
            to="/sales-growth-rate"
            onClick={handleOpen}
          >
            Growth
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={`text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-500 font-semibold ${
              location.pathname === "/new-customers" ? "text-blue-600" : ""
            }`}
            to="/new-customers"
            onClick={handleOpen}
          >
            New Customer
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={`text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-500 font-semibold ${
              location.pathname === "/repeat-customers" ? "text-blue-600" : ""
            }`}
            to="/repeat-customers"
            onClick={handleOpen}
          >
            Repeat Customer
          </Link>
        </li>
        <li className="mr-1 mt-3 md:mt-5">
          <Link
            className={`text-white text-xl md:text-3xl lg:text-4xl hover:text-blue-500 font-semibold ${
              location.pathname === "/distribution-customers"
                ? "text-blue-600"
                : ""
            }`}
            to="/distribution-customers"
            onClick={handleOpen}
          >
            Distribution Chart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
