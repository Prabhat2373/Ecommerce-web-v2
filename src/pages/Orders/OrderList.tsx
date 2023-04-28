import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Page from '../../components/Page';
import { useGetMyOrdersQuery } from '../../features/services/RTK/Api';
import Table from '../../components/Table/Table';
import { useNavigate } from 'react-router-dom';

interface OrderListType {
  id: number;
  name: string;
  email: string;
  role: string;
  skill: string;
}

const MyOrders = () => {
  const { data: Orders } = useGetMyOrdersQuery('');
  const [OrdersArray, setOrdersArray] = useState([]);
  const nav = useNavigate();
  console.log('orders', Orders);

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
              {OrdersArray?.length ? (
                <Table
                  columns={OrderColumns}
                  data={!!OrdersArray ? OrdersArray : []}
                />
              ) : (
                <div className="flex flex-col gap-3 justify-center items-center">
                  <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-semibold ">No Orders Yet</h1>
                    <button
                      onClick={() => nav('/products')}
                      className="bg-blue-700 text-white px-4 py-2 text-lg font-semibold hover:bg-white border hover:border-blue-700 hover:text-blue-700"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        }
      />
    </>
  );
};

export default MyOrders;
