import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { checkout, CartItems } from '../../app/api';

type CheckoutState = 'LOADING' | 'READY' | 'ERROR';

export interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  name: string;
  price: string;
  quantity: string;
  description: string;
  image: string;
  __v: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// export const checkoutCart = createAsyncThunk<
// 	{ success: boolean },
// 	undefined,
// 	{ state: RootState }
// >('cart/checkout', async (_, thunkAPI) => {
// 	const state = thunkAPI.getState() as RootState;
// 	console.log('rootState', state);
// 	const items = state.cart.items;
// 	const response = await checkout(items);
// 	return response;
// });

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    Cart(state, action: PayloadAction<CartItem[]>) {
      console.log('cart item in slice', action.payload);
      const cart = action.payload;
      state.items = cart;
    },
  },
});

export const { Cart } = cartSlice.actions;
export default cartSlice.reducer;

// export function getNumItems(state: RootState) {
// 	console.log('calling numItems');
// 	let numItems = 0;
// 	for (let id in state.cart.items) {
// 		numItems += state.cart.items[id];
// 	}
// 	return numItems;
// }

// export const getMemoizedNumItems = createSelector(
// 	(state: RootState) => state.cart.items,
// 	(items) => {
// 		console.log('calling getMemoizedNumItems');
// 		let numItems = 0;
// 		for (let id in items) {
// 			numItems += items[id];
// 		}
// 		return numItems;
// 	}
// );

// export const getTotalPrice = createSelector<RootState, any, any, string>(
// 	(state: RootState) => state.cart.items,
// 	(state: RootState) => state.products.products,
// 	(items, products) => {
// 		let total = 0;
// 		for (let id in items) {
// 			total += products[id].price * items[id];
// 		}
// 		return total.toFixed(2);
// 	}
// );
