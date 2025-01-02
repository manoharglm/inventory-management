import { Product } from "../types/types";

export type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "DISABLE_PRODUCT"; payload: string };

export const productReducer = (state: any, action: ProductAction) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product: Product) =>
          product.name === action.payload.name ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product: Product) => product.name !== action.payload
        ),
      };
    case "DISABLE_PRODUCT":
        return {
            ...state,
            products: state.products.map((product: Product) =>
            product.name === action.payload
                ? { ...product, disabled: !product.disabled }
                : product
            ),
        };
    default:
      return state;
  }
};
