import { useAxios } from "./useAxios";
import axios from 'axios';
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import {
    addItemToCart_request, addItemToCart_success, addItemToCart_failure,
    removeItemFromCart_request, removeItemFromCart_success, removeItemFromCart_failure,
    getAllCartItems_request, getAllCartItems_success, getAllCartItems_failure,
    emptyCart_request, emptyCart_success, emptyCart_failure,
} from "../redux/reducers/CartRequestReducer";
import { useState } from "react";

export const useCart = (token?: string | null, productId?: string | null, userId?: string | null, cartItemId?: string | null) => {
    const dispatch = useAppDispatch();
    const [getAllCartItemsResponse, setGetAllCartItemsResponse] = useState<any>(null);
    const [singleResponse, setSingleResponse] = useState<any>(null);
    // handle Add Item To Cart
    const handleAddItemToCart = async (e: any) => {
        dispatch(addItemToCart_request());

        try {
            let endpoint = '/api/v1/cart-item';

            const { postCall } = useAxios(endpoint, {
                userId: userId,
                productId: productId
            }, token);
            const result = await postCall();

            if (result.status === "success") {
                dispatch(addItemToCart_success());

                if (result.message === "Item is already in cart") {
                    toast.warn(result.message);
                } else {
                    const products=[];
                    // if(localStorage.getItem("cartItem"))products.push([...JSON.parse(localStorage.getItem("cartItem")as string)?.productId]);
                    //   localStorage.setItem("cartItem",JSON.stringify({userId:userId,productIds:[...products,productId]}))
                    toast.success(result.message);
                }
            }
        } catch (error: any) {
            dispatch(addItemToCart_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(addItemToCart_failure(error.response?.data.message));
            }
        }
    };
    // handle Get All Item
    const handleGetAllItem = async () => {
        dispatch(getAllCartItems_request());

        try {
            let endpoint = `/api/v1/cart-item/${userId}`;
            const { getCall } = useAxios(endpoint, null, token);
            const result = await getCall();

            if (result.status === "success") {
                dispatch(getAllCartItems_success());
                localStorage.setItem("cartItem",JSON.stringify(result.data))
                setGetAllCartItemsResponse(result.data);
            }
        } catch (error: any) {
            dispatch(getAllCartItems_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(getAllCartItems_failure(error.response?.data.message));
            }
        }
    };
    // handle remove Item
    const HandleRemoveItemFromCart = async () => {
        if(!cartItemId) return;
        dispatch(removeItemFromCart_request());
        try {
            let endpoint = `/api/v1/cart-item/${cartItemId}`;
            const { deleteCall } = useAxios(endpoint, {
                userId: userId
            }, token);
            const result = await deleteCall();

            if (result.status === "success") {
                dispatch(removeItemFromCart_success());
            }
        } catch (error: any) {
            dispatch(removeItemFromCart_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(removeItemFromCart_failure(error.response?.data.message));
            }
        }
    };
    // handle remove all Item
    const HandleEmptyCart = async (e: any) => {
        dispatch(emptyCart_request());
        try {
            let endpoint = `/api/v1/cart-item/${userId}`;
            const { deleteCall } = useAxios(endpoint,null, token);
            const result = await deleteCall();

            if (result.status === "success") {
                dispatch(emptyCart_success());
            }
        } catch (error: any) {
            dispatch(emptyCart_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(emptyCart_failure(error.response?.data.message));
            }
        }
    };

    return { getAllCartItemsResponse, handleAddItemToCart, handleGetAllItem, HandleRemoveItemFromCart, HandleEmptyCart };
};
