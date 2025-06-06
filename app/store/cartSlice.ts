import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}
interface CartItem {
  id: string;
  product: Product;
  date: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number; id: string }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: action.payload.id,
          product,
          quantity,
          date: new Date().toISOString(),
        });
      }

      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === id);

      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },

    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.total = action.payload.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
