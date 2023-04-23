import { useSelector } from 'react-redux';
// import callApi from '../api'
import { useGetAllCartQuery } from "../../services/RTK/Api";
import { useEffect } from 'react';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';

export const actFetchProductsRequest = () => {
    return (dispatch: any) => {
        const User = useSelector((state: any) => state.user.payload);
        const { data: CartItems } = useGetAllCartQuery(User?._id);
        useEffect(() => {
            dispatch(GetAllProduct(CartItems?.payload))
        }, [CartItems])


    }
}
console.log(actFetchProductsRequest());


/*GET_ALL_PRODUCT*/
export function GetAllProduct(payload: any) {
    return {
        type: 'GET_ALL_PRODUCT',
        payload
    }
}

/*GET NUMBER CART*/
export function GetNumberCart() {
    return {
        type: 'GET_NUMBER_CART'
    }
}

export function AddCart(payload: any) {
    return {
        type: 'ADD_CART',
        payload
    }
}
export function UpdateCart(payload: any) {
    return {
        type: 'UPDATE_CART',
        payload
    }
}
export function DeleteCart(payload: any) {
    return {
        type: 'DELETE_CART',
        payload
    }
}

export function IncreaseQuantity(payload: any) {
    return {
        type: 'INCREASE_QUANTITY',
        payload
    }
}
export function DecreaseQuantity(payload: any) {
    return {
        type: 'DECREASE_QUANTITY',
        payload
    }
}

