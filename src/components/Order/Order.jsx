import { Fragment, useEffect, useState } from "react";
import { fetchResource } from "../../utils/api";
import { Link, useParams } from "react-router-dom";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await fetchResource(`orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="w-[95%] sm:w-full h-screen flex flex-col justify-center max-w-md mx-auto gap-5">
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <Fragment>
          <h1 className="font-bold text-2xl sm:text-3xl text-slate-700">
            Order ID: <span className="text-slate-500">{order.id}</span>
          </h1>

          <div className="border rounded p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-700">
              Articles
            </h2>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.articles.map((article) => (
                  <tr key={article.reference}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {article.reference}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {article.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border rounded p-4">
            <h2 className="text-xl font-semibold mb-2 text-slate-700">
              Total Prices
            </h2>
            <p>
              <strong>Total Price Excluding Taxes:</strong> $
              {order.totalPriceExcludingTaxes}
            </p>
            <p>
              <strong>Total Price Including Taxes:</strong> $
              {order.totalPriceIncludingTaxes}
            </p>
          </div>
          <Link
            to={`/orders/${order.id}/update`}
            className="self-end bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Edit Order
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default Order;
