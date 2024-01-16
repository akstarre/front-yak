import { Cart, CartProduct } from "@/types/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface CartState {
  cartHistory: Cart[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cartHistory: null,
  status: "idle",
  error: null,
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const retrieveCartHistory = createAsyncThunk(
  "cart/createCart",
  async (userId: string): Promise<Cart[]> => {
    const response = await axios.get(`${springBootUrl}/api/cart/${userId}`);
    return response.data;
  }
);

export const cartHistorySlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveCartHistory.fulfilled, (state, action) => {
      state.cartHistory = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(retrieveCartHistory.rejected, (state, action) => {
      state.status = "failed";
      state.cartHistory = null;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(retrieveCartHistory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
  },
});

export const {} = cartHistorySlice.actions;
export default cartHistorySlice.reducer;
