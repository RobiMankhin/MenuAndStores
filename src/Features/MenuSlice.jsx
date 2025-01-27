import { createSlice } from "@reduxjs/toolkit";
import Cardsdata from "../assets/CardsData";

const initialState = {
  menu: Cardsdata,
  cart: [],
  isLoading: false,
  totalAmount: 0,
  error: null,
  searchData: "",
};

const menuSlice = createSlice({
  name: "MenuDetail",
  initialState,
  reducers: {
    SearchItems: (state, action) => {
      state.searchData = action.payload;
    },
    addToCart: (state, action) => {
      console.log("Current menu:", state.menu); //To Log the entire menu array

      const item = state.menu.find((e) => {
        return e.id == action.payload.id;
      });

      const cartitem = state.cart.find((e) => {
        return e.id == action.payload.id;
      });

      if (cartitem) {
        cartitem.qnty += 1;
      } else {
        state.cart.push({ ...item, qnty: 1 });
      }
      state.totalAmount += item.price;
    },

    removeFromcart: (state, action) => {
      const cartitemindex = state.cart.findIndex(
        (e) => e.id == action.payload.id
      );
      if (cartitemindex >= 0) {
        state.totalAmount -=
          state.cart[cartitemindex].price * state.cart[cartitemindex].qnty;

        state.cart.splice(cartitemindex, 1);
      }
    },
    increaseQnty: (state, action) => {
      const cartitem = state.cart.find((e) => e.id == action.payload.id);
      if (cartitem) {
        cartitem.qnty += 1;
        state.totalAmount += cartitem.price;
      }
    },
    decreaseQnty: (state, action) => {
      const cartitemindex = state.cart.findIndex(
        (e) => e.id == action.payload.id
      );
      const cartitem = state.cart.find((e) => e.id == action.payload.id);
      if (cartitem && cartitem.qnty > 1) {
        cartitem.qnty -= 1;
        state.totalAmount -= cartitem.price;
      } else {
        state.cart.splice(cartitemindex, 1);
        state.totalAmount -= cartitem.price;
        //or
        // state.cart.filter((e) => e.id !== action.payload.id);
      }
    },
  },
  // extraReducers: () => {},
});
export const {
  addToCart,
  removeFromcart,
  increaseQnty,
  decreaseQnty,
  SearchItems,
} = menuSlice.actions;

export default menuSlice.reducer;
