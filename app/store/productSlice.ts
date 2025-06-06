import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        return data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            });
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer; 