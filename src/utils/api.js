import axios from "axios";

// This API_URL can be kept in .env file in necessary
const API_URL = "http://localhost:8000";

export const fetchResource = async (resource) => {
  try {
    const response = await axios.get(`${API_URL}/${resource}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createResource = async (resource, data) => {
  try {
    const response = await axios.post(`${API_URL}/${resource}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateResource = async (resource, data) => {
  try {
    const response = await axios.put(`${API_URL}/${resource}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Could Add deleteResource
