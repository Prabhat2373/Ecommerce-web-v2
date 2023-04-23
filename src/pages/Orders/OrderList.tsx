import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Page from '../../components/Page';
import { useGetMyOrdersQuery } from '../../features/services/RTK/Api';
import Table from '../../components/Table/Table';

const MyOrders = () => {
  const { data: Orders } = useGetMyOrdersQuery('');
  const [OrdersArray, setOrdersArray] = useState([]);
  const User = useSelector((state: any) => state?.user?.payload);
  const Products = useSelector((state: any) => state?.products?.products);
  const sellerId = User?._id;
  const filteredProducts = Products?.filter(
    (el: any) => el?.sellerId === sellerId
  );
  console.log('orders', Orders);

  interface OrderListType {
    id: number;
    name: string;
    email: string;
    role: string;
    skill: string;
  }

  const OrderColumns = [
    {
      Header: 'ID',
      accessor: '_id',
    },
    {
      Header: 'Price',
      accessor: 'itemsPrice',
    },
    {
      Header: 'Status',
      accessor: 'orderStatus',
    },
    {
      Header: 'Order Date',
      accessor: 'createdAt',
      Cell: ({ row }: any) => {
        return (
          <>
            <span>
              {new Date(row?.original?.createdAt ?? '')?.toLocaleDateString()}
            </span>
          </>
        );
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }: any) => {
        return (
          <>
            <span>
              <button className="bg-cyan-600 px-4 py-2 rounded-lg text-white hover:opacity-75">
                View Order
              </button>
            </span>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    setOrdersArray(Orders?.orders);
  }, [Orders]);

  console.log('orders arr', OrdersArray);

  return (
    <>
      <Page
        title="Your Orders"
        content={
          <section>
            <div className="relative overflow-x-auto">
              {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts?.map((el: any) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {el?.name}
                        </th>
                        <td className="px-6 py-4">{el?.brand}</td>
                        <td className="px-6 py-4">{el?.category}</td>
                        <td className="px-6 py-4">{el?.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> */}

              <Table
                columns={OrderColumns}
                data={!!OrdersArray ? OrdersArray : []}
              />
            </div>
          </section>
        }
      />
    </>
  );
};

export default MyOrders;
