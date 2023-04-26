import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useGetAllCartQuery } from '../features/services/RTK/Api';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import { StarIcon } from '@heroicons/react/24/outline';
import { Product } from '../Types/Products';
import { GetRatings } from '../Helper/Helper';
import DropDownMenu from './DropdownMenu';
import CartComp from './Cart';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchRes, setSearchRes] = useState<Product[]>();
  const [isOpen, setIsOpen] = useState(false);
  const User = useSelector((state: any) => state?.user?.payload);
  const [searchOpen, setSearchOpen] = useState(false);
  const [NavOpen, setNavOpen] = useState(false);

  const { data: CartItems } = useGetAllCartQuery(User?._id);
  const [CartData, setCartData] = useState<any>([]);
  const [Path, setPath] = useState('');
  const link = useLocation()?.pathname;
  const Products = useSelector((state: any) => state.products.products);
  console.log('productssss', Products);
  useEffect(() => {
    setCartData(CartItems?.payload);
    setPath(link);
    setSearchRes(Products);
  }, [CartItems, Products, link]);

  return (
    <>
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
              <div className="flex transition-all duration-300">
                {searchOpen && (
                  <input
                    type="search"
                    placeholder="Seach Products..."
                    className="p-3 rounded-md border border-gray-700 transition-all duration-300"
                  />
                )}
                {searchOpen && (
                  <div className="search-products-container bg-slate-50 absolute w-2/3 h-full rounded-lg top-[80px] right-10">
                    <div className="p-4">
                      <h1 className="font-semibold text-xl">
                        Your Searched Results
                      </h1>
                    </div>
                    <div className="grid grid-cols-4 bg-slate-50">
                      {searchRes?.map((element: any) => {
                        return (
                          <>
                            <div
                              className="swiper-child bg-[#D9D9D9] m-3 "
                              key={element?._id + 1}
                            >
                              <img
                                src={element?.images[0]?.url}
                                alt={'Loading Product Imag'}
                                className="cursor-pointer"
                                width={'400px'}
                                height={'400px'}
                                onClick={() => {
                                  navigate(`/view/${element?._id}`);
                                }}
                              />
                              <div className="flex justify-between p-2">
                                <h3>{element?.name ?? 'PRODUCT '}</h3>
                                <p className="flex">
                                  {GetRatings(element?.ratings - 1)?.map(
                                    (rating: number) => {
                                      return (
                                        <StarIcon
                                          key={rating}
                                          className={
                                            'text-orange-500 h-5 w-5 flex-shrink-0'
                                          }
                                          aria-hidden="true"
                                        />
                                      );
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div
                className="flex flex-col md:flex-row md:mx-6 cursor-pointer"
                onClick={() => {
                  setSearchOpen((prev) => !prev);
                }}
              >
                <FiSearch />
              </div>
              {<CartComp isOpen={isOpen} setOpen={setIsOpen} />}
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

                  {CartData?.length > 0 ? (
                    <span className="absolute -top-3 left-3 rounded-full bg-indigo-500 text-white p-1 text-xs w-5 h-5 text-center">
                      {CartData?.length}
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
