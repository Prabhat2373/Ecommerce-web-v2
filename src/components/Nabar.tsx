import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import DropDownMenu from './DropdownMenu';
import { Link, useLocation } from 'react-router-dom';
import Cart from './Cart';
import { useGetAllCartQuery } from '../features/services/RTK/Api';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const User = useSelector((state: any) => state?.user?.payload);
  const [searchOpen, setSearchOpen] = useState(false);
  const [NavOpen, setNavOpen] = useState(false);
  const { data: CartItems } = useGetAllCartQuery('');
  const [CartData, setCartData] = useState<any>([]);
  const [Path, setPath] = useState('');
  const link = useLocation()?.pathname;

  useEffect(() => {
    setCartData(CartItems);
    setPath(link);
  }, [CartItems, link]);

  return (
    <>
      <div className="transition-all duration-500">
        <SearchBar isOpen={searchOpen} setIsOpen={setSearchOpen} />
      </div>
      <nav className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="container sticky top-0 left-0 mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div>
              <Link
                className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
                to="/"
              >
                W-SHOP
              </Link>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle menu"
                onClick={() => {
                  setNavOpen((prevState) => !prevState);
                }}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {
            <div
              className={`${
                NavOpen ? 'flex' : 'hidden'
              } flex-col md:flex-row items-start gap-2 md:gap-0 md:flex md:items-center`}
              id="navItems"
            >
              <div className="flex flex-col md:flex-row md:mx-6 text-left md:text-end ">
                <Link
                  className={`my-1 text-sm ${
                    Path === '/' ? 'text-indigo-500' : 'text-gray-700'
                  } font-medium hover:text-indigo-500 md:mx-4 md:my-0`}
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className={`my-1 text-sm ${
                    Path === '/products' ? 'text-indigo-500' : 'text-gray-700'
                  } font-medium hover:text-indigo-500 md:mx-4 md:my-0`}
                  to="/products"
                >
                  Products
                </Link>
                {/* <Link className={`my-1 text-sm ${Path === '/collections' ? 'text-indigo-500' : 'text-gray-700'} font-medium hover:text-indigo-500 md:mx-4 md:my-0`} to="/collections">Collections</Link> */}
              </div>
              <div
                className="flex flex-col md:flex-row md:mx-6 cursor-pointer"
                onClick={() => {
                  setSearchOpen((prev) => !prev);
                }}
              >
                <FiSearch />
              </div>
              {<Cart isOpen={isOpen} setOpen={setIsOpen} />}
              <div className="flex justify-center md:block">
                <p
                  className="relative text-gray-700 hover:text-gray-600 cursor-pointer"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  {CartData?.payload?.length > 0 ? (
                    <span className="absolute -top-3 left-3 rounded-full bg-indigo-500 text-white p-1 text-xs w-5 h-5 text-center">
                      {CartData?.payload?.length}
                    </span>
                  ) : (
                    ''
                  )}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:mx-6 cursor-pointer">
                {/* <SearchBar/> */}
              </div>
              <div>
                <DropDownMenu user={User} />
              </div>
            </div>
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
