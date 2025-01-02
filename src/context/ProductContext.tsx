import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '../types/types';
import { productReducer, ProductAction } from './ProductReducer';
const INVENTORY_DATA = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface ProductContextProps extends ProductState {
  dispatch: React.Dispatch<ProductAction>;
}

const initialState: ProductState = {
  products: [],
  loading: true,
  error: null,
};

export const ProductContext = createContext<ProductContextProps>({
  ...initialState,
  dispatch: () => null,
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(INVENTORY_DATA);
      const data = await response.json();
      dispatch({ type: 'SET_PRODUCTS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch inventory data using static data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      setTimeout(() => {
        dispatch({ type: 'SET_PRODUCTS', payload: STATIC_DATA });
        dispatch({ type: 'SET_ERROR', payload: null });

      }, 3000);

    }
  };

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

const STATIC_DATA: Product[] = [
  {
    name: "Bluetooth",
    category: "Electronic",
    value: "$150",
    quantity: 5,
    price: "$30",
  },
  {
    name: "Edifier M43560",
    category: "Electronic",
    value: "0",
    quantity: 0,
    price: "$0",
  },
  {
    name: "Sony 4k ultra 55 inch TV",
    category: "Electronic",
    value: "$1190",
    quantity: 17,
    price: "$70",
  },
  {
    name: "Samsumg 55 inch TV",
    category: "Electronic",
    value: "$600",
    quantity: 50,
    price: "$12",
  },
  {
    name: "samsumg S34 Ultra",
    category: "phone",
    value: "$0",
    quantity: 0,
    price: "$0",
  },
];