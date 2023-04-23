import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../features/services/RTK/Api';
import AutoCompleteField from '../../components/Forms/AutoCompleteField';
import Toast from '../../components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { Show } from '../../features/Slices/ToastSlice';
const Categories = [
  {
    id: 1,
    name: 'electronics',
  },
  {
    id: 2,
    name: 'fashion',
  },
  {
    id: 3,
    name: 'footwere',
  },
  {
    id: 4,
    name: 'cloths',
  },
  {
    id: 5,
    name: 'hardwere',
  },
  {
    id: 6,
    name: 'beauty products',
  },
  {
    id: 7,
    name: 'medicines',
  },
  {
    id: 8,
    name: 'Mason Heaney',
  },
  {
    id: 9,
    name: 'stationery',
  },
  {
    id: 10,
    name: 'accessories',
  },
];

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isAlert, setIsAlert] = useState(false);
  const productRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();
  const [CreateProduct] = useCreateProductMutation();
  const User = useSelector((state: any) => state?.user?.payload);
  console.log('USER ', User);
  console.log('filesss', productRef.current?.files)
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    var formdata = new FormData();
    if (productRef.current.files) {
      for (let i = 0; i < productRef?.current.files.length; i++) {
        formdata.append('images', productRef?.current?.files[i])
      }
    }
    formdata.append('name', data.name);
    formdata.append('description', data.desc);
    formdata.append('price', data.price);
    formdata.append('stock', data.stock);
    formdata.append('category', data.category);
    formdata.append('brand', data.brand);
    formdata.append('ratings', data.ratings);
    formdata.append('sellerId', User?._id ?? '');
    // formdata.append('images', productRef.current?.files);

    CreateProduct(formdata)
      .then(() => {
        // alert("Product Has Been Created");
        dispatch(
          Show({
            isOpen: true,
            message: 'Product Has Been Created',
            title: 'SUCCESS',
          })
        );
        // navigate("/")
      })
      .catch((err) => console.log(err?.message));
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
              {...register('name')}
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
              {...register('file')}
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
              {...register('desc')}
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
              {...register('price')}
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
              {...register('stock')}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              category
            </label>
            <select id="category" {...register('category')}>
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
              {...register('brand')}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              ratings
            </label>
            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register('ratings')}
            />
          </div>

          <div className="mt-6">
            <input
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-800"
              value={'Upload Product'}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductCreate;
