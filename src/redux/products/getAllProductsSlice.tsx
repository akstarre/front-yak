import { Product } from "@/types/product";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (): Promise<Product[]> => {
    const responses = await axios.get(`${springBootUrl}/api/products`);
    return responses.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default productsSlice.reducer;
