import React, { useContext, createContext, useReducer, useEffect } from 'react';

import { Order as IOrder } from '../../types/Order';
import { Product as IProduct } from '../../types/Product';
import globalReducer from './GlobalRedcuer';

export interface IGloablContextProvider {
  children: React.ReactNode;
}

export interface IGloablContext {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  updateProduct: (products: IProduct) => void;
  deleteProduct: (product: string) => void;
  addProduct: (product: IProduct) => void;
  updateOrder: (orders: IOrder) => void;
  deleteOrder: (order: string) => void;
  addOrder: (order: IOrder) => void;
}

const initialState: IGloablContext = {
  products: [],
  setProducts: (products: IProduct[]) => { },
  updateProduct: (product: IProduct) => { },
  deleteProduct: (product: string) => { },
  addProduct: (product: IProduct) => { },
  updateOrder: (order: IOrder) => { },
  deleteOrder: (order: string) => { },
  addOrder: (order: IOrder) => { },
}

const GlobalContext = createContext(initialState);

export function GlobalContextProvider({ children }: React.PropsWithChildren<IGloablContextProvider>) {
  const globalStateValues = useGlobalProvider();
  return <GlobalContext.Provider value={globalStateValues}>{children}</GlobalContext.Provider>;
}

export default function useGlobalContext() {
  const globalStates = useContext(GlobalContext);
  return globalStates;
}

function useGlobalProvider() {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const { products } = state;

  const setProducts = (products: IProduct[]) => {
    dispatch({
      type: "SET_PRODUCTS",
      payload: products
    });
  }

  const updateProduct = (product: IProduct) => {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: product
    });
  }

  const deleteProduct = (product: string) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: product
    });
  }

  const addProduct = (product: IProduct) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product
    });
  }

  const updateOrder = (order: IOrder) => {
    dispatch({
      type: "UPDATE_ORDER",
      payload: order
    });
  }

  const deleteOrder = (order: string) => {
    dispatch({
      type: "DELETE_ORDER",
      payload: order
    });
  }

  const addOrder = (order: IOrder) => {
    dispatch({
      type: "ADD_ORDER",
      payload: order
    });
  }



  return {
    products,
    setProducts,
    updateProduct,
    deleteProduct,
    addProduct,
    updateOrder,
    deleteOrder,
    addOrder
  }
}
