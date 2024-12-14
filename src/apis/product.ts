import axios from "axios";

export const productApis = {
  getAllProducts: async (params: Record<string, any>) => {
    const resp = await axios.get(
      `${process.env.REACT_APP_BE_URL}/products`,
      params
    );
    return resp.data;
  },
  getProductById: async (productId: string) => {
    const resp = await axios.get(
      `${process.env.REACT_APP_BE_URL}/products/${productId}`
    );
    return resp.data;
  },
};
