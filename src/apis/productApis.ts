import axios from "axios";

export const productApis = {
  getAllProducts: async (params: Record<string, any>) => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_BE_URL}/products`, {
        params,
      });
      return resp.data;
    } catch (error) {
      console.error("Error fetching products", error);
      throw error;
    }
  },

  getProductById: async (productId: string) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_BE_URL}/products/${productId}`
      );
      return resp.data;
    } catch (error) {
      console.error("Error fetching product by ID", error);
      throw error;
    }
  },

  getAllBrands: async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_BE_URL}/brands`);
      return resp.data;
    } catch (error) {
      console.error("Error fetching brands", error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_BE_URL}/categories`
      );
      return resp.data;
    } catch (error) {
      console.error("Error fetching categories", error);
      throw error;
    }
  },

  fetchOrders: async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_BE_URL}/orders`);
      return resp.data;
    } catch (error) {
      console.error("Error fetching orders", error);
      throw error;
    }
  },
};
