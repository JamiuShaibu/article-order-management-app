import { useEffect, useState } from "react";
import { fetchResource } from "../../utils/api";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchResource("orders");
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="w-[95%] sm:w-full h-screen flex flex-col gap-4 justify-center items-center mt-16 sm:mt-0">
      {error && <div>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && (
        <div className="p-2 sm:p-5 w-[98%] sm:w-[80%] flex flex-col gap-5">
          <div className="flex w-full flex-col gap-10 justify-center items-center">
            <h1 className="font-bold text-4xl sm:text-6xl text-slate-700">
              Orders
            </h1>
            <Link
              to="/orders/new"
              className="self-end bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Create new order
            </Link>
          </div>
          <div className="shadow-lg flex justify-center items-center rounded-lg">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order ID</th>
                    <th className="py-3 px-6 text-left">Articles</th>
                    <th className="py-3 px-6 text-left">
                      Total Price (Excluding Tax)
                    </th>
                    <th className="py-3 px-6 text-left">
                      Total Price (Including Tax)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <ul>
                          {order.articles.map((article, index) => (
                            <li key={index}>
                              {article.reference} - Qty: {article.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-6 text-left">
                        ${order.totalPriceExcludingTaxes}
                      </td>
                      <td className="py-3 px-6 text-left">
                        ${order.totalPriceIncludingTaxes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
