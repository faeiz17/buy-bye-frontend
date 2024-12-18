import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const productListViewServiceFunc = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/products`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
};
export const productCategoriesServiceFunc = async () => {
  try {
    debugger;
    const response = await axios.get(`${BASE_URL}api/products/categories`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    debugger;
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
};
export const getFeatureProductsServiceFunc = async () => {
  try {
    debugger;
    const response = await axios.get(
      `${BASE_URL}api/products?featureProducts=true`
    );
    return response.data;
  } catch (error) {
    debugger;
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
};
