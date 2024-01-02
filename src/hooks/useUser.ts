
import { useAxios } from "./useAxios"
import axios from 'axios'
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import { deleteUser_failure, deleteUser_request, deleteUser_success, getUser_failure, getUser_request, getUser_success, signoutUser_failure, signoutUser_request, signoutUser_success, updatePhoneNumber_failure, updatePhoneNumber_request, updatePhoneNumber_success, updateUser_failure, updateUser_request, updateUser_success} from "../redux/reducers/userRequestReducer";
// import { runValidations } from "../utils/runValidations";
import { update_user_data } from "../redux/reducers/userReducer";
import  {useRouter}  from "next/router";
export const useUser = (token?:string|null, id?:string|null) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleGetUser= async () => {
        dispatch(getUser_request());
        // if(!token) return;
        try {
            const {getCall} = useAxios(`/api/v1/user/${id}`,token);

            const response = await getCall();

            if(response.status === "success"){
                dispatch(getUser_success());
                dispatch(update_user_data(response.data.user));
                const data:any=JSON.parse(localStorage.getItem("user") as string);
                localStorage.setItem('user',JSON.stringify({...data,...response.data.user}));      
            }
        } catch (error: any) {
            dispatch(getUser_failure(error.message));
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message);
                dispatch(getUser_failure(error.response?.data.message));
            }
        }
    }
    const handleDeleteUser= async (e: any) => {
        e.preventDefault();
        dispatch(deleteUser_request());
        // if(!token) return;
        try {
            const {deleteCall} = useAxios(`/api/v1/user/${id}`,token);

            const response = await deleteCall();

            if(response.status === "success"){
                dispatch(deleteUser_success());
                dispatch(update_user_data(response.data.user));
                localStorage.removeItem("user");
                return function success(){
                    toast.success(response.message&&response.message);
                    setTimeout(()=>router.push('/'),3000)
                 }()   
            }
        } catch (error: any) {
            dispatch(deleteUser_failure(error.message));
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message);
                dispatch(deleteUser_failure(error.response?.data.message));
            }
        }
    }
    const handleLogOutUser= async (e: any) => {
        e.preventDefault();
        dispatch(signoutUser_request());
        // if(!token) return;
        try {
            const {postCall} = useAxios(`/api/v1/user/signout/` ,token);

            const response = await postCall();

            if(response.status === "success"){
                dispatch(signoutUser_success());
                dispatch(update_user_data(response.data.user));
                localStorage.removeItem("user");  
                return function success(){
                    toast.success(response.message&&response.message);
                    setTimeout(()=>router.push('/'),3000)
                 }()    
            }
        } catch (error: any) {
            dispatch(signoutUser_failure(error.message));
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message);
                dispatch(signoutUser_failure(error.response?.data.message));
            }
        }
    }
    const handleUpdateFieldsUser= async (e: any) => {
        e.preventDefault();
        dispatch(updateUser_request());
        // if(!token) return;
        try {
            const {putCall} = useAxios(`/api/v1/user/getUser/${id}` ,token);

            const response = await putCall();

            if(response.status === "success"){
                dispatch(updateUser_success());
                dispatch(update_user_data(response.data.user));
                localStorage.setItem('user',JSON.stringify({...response.data.user, token:response.data.token}));
                return function success(){
                    toast.success(response.message&&response.message);
                 }()    
            }
        } catch (error: any) {
            dispatch(updateUser_failure(error.message));
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message);
                dispatch(updateUser_failure(error.response?.data.message));
            }
        }
    
    }
    const handleUpdatePhoneNumberUser= async (e: any) => {
        e.preventDefault();
        dispatch(updatePhoneNumber_request());
        // if(!token) return;
        try {
            const {putCall} = useAxios(`/api/v1/user/getUser/${id}` ,token);

            const response = await putCall();

            if(response.status === "success"){
                dispatch(updatePhoneNumber_success());
                dispatch(update_user_data(response.data.user));
                localStorage.setItem('user',JSON.stringify({...response.data.user, token:response.data.token}));
                return function success(){
                    toast.success(response.message&&response.message);
                 }()    
            }
        } catch (error: any) {
            dispatch(updatePhoneNumber_failure(error.message));
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message);
                dispatch(updatePhoneNumber_failure(error.response?.data.message));
            }
        }
    }
    return {handleGetUser,handleDeleteUser,handleLogOutUser,handleUpdateFieldsUser,handleUpdatePhoneNumberUser}
} 