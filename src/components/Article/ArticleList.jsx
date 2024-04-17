import { useEffect, useState } from "react";
import { fetchResource } from "../../utils/api";
import { Link } from "react-router-dom";
const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchResource("articles");
        setArticles(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="w-[95%] sm:w-full h-screen flex flex-col gap-4 justify-center items-center mt-16 sm:mt-0">
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <div className="p-2 sm:p-5 w-[98%] sm:w-[80%] flex flex-col gap-5">
          <div className="flex w-full flex-col gap-10 justify-center items-center">
            <h1 className="font-bold text-4xl sm:text-6xl text-slate-700">
              Articles
            </h1>
            <Link
              to="/articles/new"
              className="self-end bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Create new article
            </Link>
          </div>
          <div className="shadow-lg flex justify-center items-center rounded-lg">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Reference</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th className="py-3 px-6 text-left">Tax Rate</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <Link
                          to={`/articles/${article.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {article.reference}
                        </Link>
                      </td>
                      <td className="py-3 px-6 text-left">{article.name}</td>
                      <td
                        className="py-3 px-6 text-left overflow-hidden whitespace-nowrap"
                        style={{
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {article.description}
                      </td>
                      <td className="py-3 px-6 text-left">${article.price}</td>
                      <td className="py-3 px-6 text-left">
                        {article.taxRate * 100}%
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

export default ArticleList;
