import { Product } from "@/types/product";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductsState {
  item: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  item: null,
  status: "idle",
  error: null,
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const fetchProductById = createAsyncThunk(
  "products/fetchProducts",
  async (id: string): Promise<Product> => {
    const responses = await axios.get(`${springBootUrl}/api/products/id/${id}`);
    return responses.data;
  }
);

export const productById = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.item = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default productById.reducer;
