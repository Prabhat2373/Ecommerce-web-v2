import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from '../../Types/Products';
// import type { Product } from "../../app/api";
// export interface Product {
//     _id: string;
//     name: string;
//     price: number;
//     desc: string;
//     image: string;
// }

export interface ProductsState {
    products: { [_id: string]: Product } | any
}

const initialState: ProductsState = {
    products: {}
}

const productsSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        Products(state, action: PayloadAction<Product[]>) {
            const products = action.payload;
            state.products = products

        }
    },
});

export const { Products } = productsSlice.actions;
export default productsSlice.reducer;