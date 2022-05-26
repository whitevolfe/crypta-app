import { IGloablContext } from "./GlobalContext";

export interface IGloablAction {
  type: "SET_PRODUCTS" | "ADD_PRODUCT" | "DELETE_PRODUCT" | "UPDATE_PRODUCT" | "ADD_ORDER" | "DELETE_ORDER" | "UPDATE_ORDER";
  payload: any;
}

export default function GlobalReducer(state: IGloablContext, action: IGloablAction) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(product => product["@id"] !== action.payload)
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map(product => {
          if (product["@id"] === action.payload["@id"]) {
            return action.payload;
          }
          return product;
        })
      };
    case "ADD_ORDER": {
      return {
        ...state,
        products: state.products.map(product => {
          if (product["@id"] === action.payload["product"]) {
            return {
              ...product,
              orders: [...product.orders, action.payload]
            }
          }
          return product;
        })
      };
    }

    case "DELETE_ORDER": {
      const products = state.products.map(product => {
        const currentOrder = product.orders.find(order => order["@id"] === action.payload);
        if (currentOrder) {
          return {
            ...product,
            orders: product.orders.filter(order => order["@id"] !== action.payload)
          }
        }
        return product;
      })
      return {
        ...state,
        products
      }
    }

    case "UPDATE_ORDER": {
      return {
        ...state,
        products: state.products.map(product => {
          if (product["@id"] === action.payload.product) {
            return {
              ...product,
              orders: product.orders.map(order => {
                if (order["@id"] === action.payload["@id"]) {
                  return action.payload;
                }
                return order;
              })
            }
          }
          return product;
        })
      }
    }

    default:
      return state;
  }
}