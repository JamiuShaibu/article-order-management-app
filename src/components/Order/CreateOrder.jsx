import { useEffect, useState } from "react";
import { createResource, fetchResource } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { calculateTotalPrices } from "../../utils/calculator";

const CreateOrder = () => {
  const [availableArticleReferences, setAvailableArticleReferences] = useState(
    []
  );
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articleAdded, setArticleAdded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchResource("articles");
        setArticles(data);
        const references = data.map((article) => article.reference);
        setAvailableArticleReferences(references);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const [formData, setFormData] = useState({
    articles: [],
    totalPriceExcludingTaxes: 0,
    totalPriceIncludingTaxes: 0,
  });

  const handleArticleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedArticles = [...formData.articles];
    updatedArticles[index] = {
      ...updatedArticles[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      articles: updatedArticles,
    });
  };

  const addArticle = () => {
    setArticleAdded(true);
    setFormData({
      ...formData,
      articles: [...formData.articles, { reference: "", quantity: 1 }],
    });
  };

  const removeArticle = (index) => {
    const updatedArticles = [...formData.articles];
    updatedArticles.splice(index, 1);
    setFormData({
      ...formData,
      articles: updatedArticles,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { totalPriceExcludingTaxes, totalPriceIncludingTaxes } =
      calculateTotalPrices(formData, articles);

    // Update formData with calculated values
    const updatedFormData = {
      ...formData,
      totalPriceExcludingTaxes,
      totalPriceIncludingTaxes,
    };

    // Create order with updated formData
    await createResource("orders", updatedFormData);

    navigate("/orders");
  };

  return (
    <div className="w-[95%] sm:w-full h-screen flex flex-col justify-center max-w-md mx-auto gap-5 mt-16 sm:mt-0">
      <h2 className="text-4xl sm:text-6xl font-bold text-slate-700 self-center">
        Create Order
      </h2>
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 py-6"
        >
          <div className="mb-4">
            <label
              htmlFor="articles"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Articles:
            </label>
            {formData.articles.map((article, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  name="reference"
                  value={article.reference}
                  onChange={(e) => handleArticleChange(index, e)}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight outline-none mr-2"
                  required
                >
                  <option value="" disabled>
                    Select article reference
                  </option>
                  {availableArticleReferences.map((ref) => (
                    <option key={ref} value={ref}>
                      {ref}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="quantity"
                  value={article.quantity}
                  onChange={(e) => handleArticleChange(index, e)}
                  className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight outline-none"
                  placeholder="Qty"
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => removeArticle(index)}
                  className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addArticle}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Add Article
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!articleAdded}
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded"
            >
              Create Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateOrder;
