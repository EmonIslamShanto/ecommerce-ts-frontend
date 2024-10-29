import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharge: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        phoneNo: "",
        postalCode: "",
        country: "",
    }
};
export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: 
    {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;

            const index = state.cartItems.findIndex((i) => i.productId === action.payload.productId);
            if(index !== -1) {
                state.cartItems[index] = action.payload;
            }
            else{
                state.cartItems.push(action.payload);
            }
            state.loading = false;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
            state.loading = false;
        },
        calculateTotalPrice: (state) => {
            const subTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            state.subtotal = subTotal
            state.tax = subTotal * 0.05;
            state.shippingCharge = (subTotal < 1500) ? 0 : 100;
            state.total = subTotal + state.tax + state.shippingCharge - state.discount;
        },
        discountApplied: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart: () => initialState,
    }
})

export const { 
    addToCart, 
    removeFromCart, 
    calculateTotalPrice, 
    discountApplied, 
    saveShippingInfo, 
    resetCart 
} = cartReducer.actions;