import { Fragment, useEffect, useState } from "react";
import { fetchResource } from "../../utils/api";
import { Link, useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await fetchResource(`articles/${id}`);
        setArticle(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="w-[95%] sm:w-full h-screen flex flex-col gap-4 justify-center items-center mt-16 sm:mt-0">
      <div className="p-2 sm:p-5 w-[98%] sm:w-[80%] flex flex-col gap-5 items-center">
        {error && <p>Error: {error.message}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && (
          <Fragment>
            <h1 className="font-bold text-2xl sm:text-3xl text-slate-700">
              {article.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{article.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded p-4">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <p>
                  <strong>Reference:</strong> {article.reference}
                </p>
                <p>
                  <strong>Price:</strong> ${article.price}
                </p>
                <p>
                  <strong>Tax Rate:</strong> {article.taxRate * 100}%
                </p>
              </div>

              <div className="border rounded p-4">
                <h2 className="text-xl font-semibold mb-2">
                  Complete Description
                </h2>
                <p className="text-justify text-gray-600 mb-6">
                  {article.description}
                </p>
              </div>
            </div>
            <Link
              to={`/articles/${article.id}/update`}
              className="self-end bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Edit Article
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Article;
