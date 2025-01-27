import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { SearchItems } from "../Features/MenuSlice";

const Navbar = () => {
  const { cart } = useSelector((state) => state.food);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [opentab, setOpentab] = useState(false);
  const dispatch = useDispatch();

  const handletab = () => {
    setOpentab(!opentab);
  };
  const handleSearch = (e) => {
    const list = e.target.value;
    console.log(list);
    dispatch(SearchItems(list));
    setSearch(list);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      <nav className="fixed z-50 left-0 right-0 top-0 bg-teal-950 p-1 rounded-md text-white">
        <ul className="relative md:font-semibold font-medium text-sm md:text-lg py-1 px-7 rounded-md items-center flex gap-6 md:gap-10">
          <li className="md:mr-2 ">
            <h1 className="w-full text-xl font-bold text-[#00df9a]">
              <Link to="/">Khawa-Dawa</Link>
            </h1>
          </li>
          <li className="md:flex hidden gap-6">
            <div className="hover:text-neutral-300">
              <Link to="/">Home</Link>
            </div>
            <div className="hover:text-neutral-300">
              <Link to="/menu">Menu</Link>
            </div>
          </li>
          <li className="md:flex hidden rounded-md items-center border-black border-2 w-60 ml-10">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full px-2 py-1 rounded-lg text-black"
            />
          </li>
          <li className="md:hover:text-neutral-300  hover:text-yellow-800 rounded-full right-3 md:text-white text-black top-16 md:top-4 md:right-8 fixed cursor-pointer">
            <div className="relative" aria-label="cart" onClick={handleClick}>
              <FaCartArrowDown size={25} />
              <span className="top-0 right-0 translate-x-3 transform -translate-y-1 flex items-center justify-center w-4 h-4 bg-blue-700 rounded-md absolute font-bold text-xs">
                {cart.length}
              </span>
            </div>
          </li>
          <div className="">
            <CartList open={open} />
          </div>
          <div
            onClick={handletab}
            className="block md:hidden ml-auto cursor-pointer text-white"
          >
            {opentab ? (
              <AiOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </div>
          <div
            className={`md:hidden z-50 fixed flex flex-col gap-4 p-3 top-0 left-0 bg-teal-800 border-r-gray-600 border-r h-screen w-[55%] ${
              opentab ? "translate-x-0" : "translate-x-[-100%]"
            } ease-in-out duration-300`}
          >
            <div className="md:mr-2 ">
              <h1 className="w-full text-xl font-bold text-[#00df9a]">
                <Link to="/">Khawa-Dawa</Link>
              </h1>
            </div>
            <div>
              <input
                className="px-2 py-2 rounded-lg text-black w-full"
                value={search}
                onChange={handleSearch}
                type="text"
                placeholder="Search...."
              />
            </div>
            <div className="flex flex-col gap-4">
              <Link
                className="cursor-pointer block px-1 rounded-lg py-2 hover:bg-teal-700"
                to="/"
              >
                Home
              </Link>
              <Link
                className="cursor-pointer block px-1 rounded-lg py-2 hover:bg-teal-700"
                to="/menu"
              >
                Menu
              </Link>
            </div>
          </div>
        </ul>
      </nav>
      <div className="mb-11 relative top-9 md:top-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
