import { Product } from "@/types/product";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductsState {
  categories: {
    [categoryName: string]: Product[];
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface ThunkReturnObject {
  category: string;
  data: Product[];
}

const initialState: ProductsState = {
  categories: {},
  status: "idle",
  error: null,
};

const springBootUrl = process.env.NEXT_PUBLIC_SPRING_BOOT_URL;

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProducts",
  async (category: string): Promise<ThunkReturnObject> => {
    const { data } = await axios.get(
      `${springBootUrl}/api/products/category/${category}`
    );
    return { category, data };
  }
);

export const productsByCategorySlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      const { category, data } = action.payload;
      state.status = "succeeded";
      state.categories[category] = data;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(fetchProductsByCategory.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default productsByCategorySlice.reducer;
