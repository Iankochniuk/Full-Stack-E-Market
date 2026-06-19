import axios from "axios";

const API_URL = "${API_URL}/products";

export const getProducts = async () => {
  const response = await axios.get("${API_URL}/products");

  return response.data;
};
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};
