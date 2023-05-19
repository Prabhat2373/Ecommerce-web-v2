import React, { useState } from "react";
import Sections from "../../components/Sections";
import { useNavigate } from "react-router-dom";
import WomenImg from "../../Assets/images/shopping-women.jpg";
import { useSelector } from "react-redux";
import { useToast } from "../../features/Toast/ToastContext";
import Modal from "../../components/Modal/Modal";
import { RootState } from "../../store";
import { useGetProductsQuery } from "../../features/services/RTK/Api";
import women2 from "../../Assets/images/women-1.jpg";
import heroImg1 from "../../Assets/images/cloths-men.jpg";
import heroImg2 from "../../Assets/images/shopping-bag.jpg";
import urbanMen from "../../Assets/images/urban-men.jpg";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: item } = useGetProductsQuery("");
  const ClothsItems =
    item?.products?.filter(
      (el: any, index: number) => el?.category === "fashion"
    ) ?? [];
  const ElectronicsItems = item?.products?.filter(
    (el: any, index: number) => el?.category === "electronics"
  );
  const OthersItems = item?.products?.filter(
    (el: any, index: number) =>
      el?.category !== "fashion" && el?.category !== "electronics"
  );
  const toast = useToast();
  const navigate = useNavigate();
  const showToast = (message: any) => toast.open(`${message}`, "success");

  console.log("item", item);
  return (
    <>
      <div className="main-parent grid md:grid-cols-2 gap-3 mt-16 ">
        <div className="first-child ">
          <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img
              className="w-full relative h-[550px] object-cover brightness-[0.5]"
              src={WomenImg}
              alt="Flower and sky"
            />
            <div className="absolute bottom-[150px] left-0 px-6 py-4">
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                Shop Women's Trend
              </h4>
              <p className="leading-normal text-gray-100">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                vitae <br /> ullam quam voluptas quae ab error quos
              </p>
              <button
                className="shop-btns p-3 border-2 text-white font-semibold mt-3 hover:bg-white hover:text-black transition-all duration-200"
                onClick={() => {
                  // navigate('/products?womens')
                  showToast("This is test");
                }}
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
        <div className="second-parent grid sm:grid-cols-2 gap-3">
          <div className="">
            <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img
                className="relative w-full h-[270px] object-cover brightness-[0.5]"
                src={women2}
                alt="Flower and sky"
              />

              <div className="absolute bottom-0 left-0 px-6 py-4">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Try Urban Fashion
                </h4>
                <p className="leading-normal text-gray-100">
                  Lorem ipsum dolor, sit amet cons ectetur adipis icing elit. P
                </p>
                <button
                  className="shop-btns p-3 border-2 text-white font-semibold mt-3 hover:bg-white hover:text-black transition-all duration-200"
                  onClick={() => {
                    navigate("/products?category=fashion");
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img
                className="relative w-full h-[270px] object-cover brightness-[0.5]"
                src={heroImg1}
                alt="Flower and sky"
              />

              <div className="absolute bottom-0 left-0 px-6 py-4">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Professional Men
                </h4>
                <p className="leading-normal text-gray-100">
                  Lorem ipsum dolor, siud.
                </p>
                <button
                  className="shop-btns p-3 border-2 text-white font-semibold mt-3 hover:bg-white hover:text-black transition-all duration-200"
                  onClick={() => {
                    navigate("/products?mensTrends");
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img
                className="relative w-full h-[270px] object-cover brightness-[0.5]"
                src={urbanMen}
                alt="Flower and sky"
              />

              <div className="absolute bottom-0 left-0 px-6 py-4">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Boys Trend
                </h4>
                <p className="leading-normal text-gray-100">
                  Lorem ipsum dolor, sit amet cons ectetur a.
                </p>
                <button
                  className="shop-btns p-3 border-2 text-white font-semibold mt-3 hover:bg-white hover:text-black transition-all duration-200"
                  onClick={() => {
                    navigate("/products?boys");
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img
                className="relative w-full h-[270px] object-cover brightness-[0.5]"
                src={heroImg2}
                alt="Flower and sky"
              />

              <div className="absolute bottom-0 left-0 px-6 py-4">
                <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
                  Big Brands Products
                </h4>
                <p className="leading-normal text-gray-100">
                  Lorem ipsum dolor, sit amet cons ectetur
                </p>
                <button
                  className="shop-btns p-3 border-2 text-white font-semibold mt-3 hover:bg-white hover:text-black transition-all duration-200"
                  onClick={() => {
                    navigate("/products?brand");
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sections title="Fashion & Cloths" data={ClothsItems} />
      <Sections title="Tech and Electronics" data={ElectronicsItems} />
      <Sections title="Others" data={OthersItems} />
    </>
  );
}
