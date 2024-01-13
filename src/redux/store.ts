import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/redux/products/getAllProductsSlice";
import productsByCategoryReducer from "@/redux/products/getProductsByCategorySlice";
import productByIdReducer from "@/redux/products/getProductByIdSlice";
import cartReducer from "@/redux/carts/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productsByCategory: productsByCategoryReducer,
    productById: productByIdReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
