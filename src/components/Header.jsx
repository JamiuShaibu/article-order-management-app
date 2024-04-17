import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-gray-300 h-14 text-xl font-semibold  w-full fixed top-0 flex justify-end items-center gap-6 py-4 px-8 sm:px-40">
      <Link
        to="/"
        className="hover:text-slate-800 text-slate-700 cursor-pointer"
      >
        Articles
      </Link>
      <Link
        to="/orders"
        className="hover:text-slate-800 text-slate-700 cursor-pointer"
      >
        Orders
      </Link>
    </div>
  );
};

export default Header;
