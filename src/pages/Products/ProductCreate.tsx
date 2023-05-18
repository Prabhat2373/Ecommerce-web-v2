import React, { MutableRefObject, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../features/services/RTK/Api";
import { useSelector } from "react-redux";
import { useToast } from "../../features/Toast/ToastContext";
import { Button } from "../../components/Button/Button";
const Categories = [
  {
    id: 1,
    name: "electronics",
  },
  {
    id: 2,
    name: "fashion",
  },
  {
    id: 3,
    name: "footwere",
  },
  {
    id: 4,
    name: "cloths",
  },
  {
    id: 5,
    name: "hardwere",
  },
  {
    id: 6,
    name: "beauty products",
  },
  {
    id: 7,
    name: "medicines",
  },
  {
    id: 8,
    name: "Mason Heaney",
  },
  {
    id: 9,
    name: "stationery",
  },
  {
    id: 10,
    name: "accessories",
  },
];

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const productRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [CreateProduct, { isLoading }] = useCreateProductMutation();
  const User = useSelector((state: any) => state?.user?.payload);

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    var formdata = new FormData();
    if (productRef.current.files) {
      for (let i = 0; i < productRef?.current.files.length; i++) {
        formdata.append("images", productRef?.current?.files[i]);
      }
    }
    formdata.append("name", data.name);
    formdata.append("description", data.desc);
    formdata.append("price", data.price);
    formdata.append("stock", data.stock);
    formdata.append("category", data.category);
    formdata.append("brand", data.brand);
    formdata.append("ratings", data.ratings);
    formdata.append("sellerId", User?._id ?? "");

    CreateProduct(formdata)
      .then((res: any) => {
        console.log("RES", res);
        if (res.data.success) {
          toast.open("Product Created Successfully!", "success");
          navigate("/");
        } else {
          toast.open(res.data.message, "error");
        }
      })
      .catch((err) => toast.open(err.data.message, "error"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-20">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-500 uppercase">
            Upload Product
          </h1>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("name")}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Product Image
            </label>
            <input
              type="file"
              className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("file")}
              id="profile"
              multiple={true}
              ref={productRef}
              onChange={() => {
                console.log(productRef);
              }}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="desc"
              className="block text-sm font-semibold text-gray-800"
            >
              Description
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("desc")}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              price
            </label>
            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("price")}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Stock Count
            </label>
            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("stock")}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              category
            </label>
            <select id="category" {...register("category")}>
              {Categories?.map((el) => {
                return <option value={el?.name}>{el?.name}</option>;
              })}
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Brand Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("brand")}
            />
          </div>

          <div className="mt-6">
            {/* <input
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-800"
              value={"Upload Product"}
            />
            {isLoading && (
              <div role="status" className="relative right-12 top-2">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5 h-5 text-white animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#e1f4fecc"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )} */}
            <Button variant="primary" type="submit" isLoading={isLoading}>
              Upload
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductCreate;
