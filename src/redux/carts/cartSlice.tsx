import { Cart, CartProduct } from "@/types/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface CartState {
  cart: Cart | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: {
    id: null,
    userId: null,
    products: [],
  },
  status: "idle",
  error: null,
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const postCart = createAsyncThunk(
  "cart/createCart",
  async (cart: Cart): Promise<void> => {
    const response = await axios.post(
      `${springBootUrl}/api/cart`,
      JSON.stringify(cart),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    createCart: (state, action) => {
      if (!state.cart || state.cart.userId !== action.payload) {
        const userId = action.payload || null;
        state.cart = {
          id: uuidv4(),
          userId: userId,
          products: [],
        };
      }
    },
    addProduct: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.cart?.products.find(
        (p: CartProduct) => p.productId === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart?.products.push(action.payload);
      }
    },
    updateProductQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const product = state.cart?.products.find(
        (p: CartProduct) => p.productId === productId
      );
      if (product) {
        if (newQuantity > 0) {
          product.quantity = newQuantity;
        } else {
          state.cart?.products.filter(
            (p: CartProduct) => p.productId !== productId
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCart.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(postCart.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(postCart.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export const { createCart, addProduct, updateProductQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
