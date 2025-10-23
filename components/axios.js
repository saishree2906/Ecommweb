import axios from "axios";

const baseURL = "http://localhost:5001/api";

const instance = axios.create({
  baseURL, // every request will start with http://localhost:5001/api
});

// ✅ Auth Endpoints
export const loginUrl = baseURL + "/auth/login";
export const signupUrl = baseURL + "/auth/signup";

// ✅ Product Endpoints
export const addProductUrl = baseURL + "/products/add";
export const getProductsUrl = (userId) => baseURL + `/products/${userId}`;

// ✅ Cart Endpoints
export const getCartUrl = (userId) => baseURL + `/cart/${userId}`;
export const addToCartUrl = baseURL + "/cart/add";

export default instance;
