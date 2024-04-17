import { useState } from "react";
import { createResource } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reference: "",
    name: "",
    description: "",
    price: "",
    taxRate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createResource("articles", formData);
    navigate("/");
  };

  return (
    <div className="w-[95%] sm:w-full max-w-md mx-auto h-screen flex justify-center flex-col gap-5 mt-16 sm:mt-0">
      <h2 className="text-4xl sm:text-6xl font-bold text-slate-700 self-center">
        Create Article
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6"
      >
        <div className="mb-4">
          <label
            htmlFor="reference"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Reference:
          </label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 outline-none"
            placeholder="Enter reference"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 outline-none"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 outline-none"
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 outline-none"
            placeholder="Enter price"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="taxRate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tax Rate:
          </label>
          <input
            type="text"
            id="taxRate"
            name="taxRate"
            value={formData.taxRate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 outline-none"
            placeholder="Enter tax rate"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
