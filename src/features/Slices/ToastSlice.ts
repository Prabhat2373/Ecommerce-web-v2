import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { Product } from "../../app/api";
export interface Toast {
    isOpen:boolean
    title:String,
    message:String
}



const initialState = {
    toast: {}
}

const ToastSlice = createSlice({
    initialState,
    name: "toast",
    reducers: {
        Show(state, action: PayloadAction<Toast>) {
            const toast = action.payload;
            console.log(toast)
            state.toast = toast
        }
    },
});

export const { Show } = ToastSlice.actions;
export default ToastSlice.reducer;