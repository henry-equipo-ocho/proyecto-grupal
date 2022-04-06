import { useDispatch } from "react-redux";
import { setToken } from "../Redux/Actions/actions";
import { axiosPrivate } from "./axios";

export const useRefreshToken = () => {

    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await axiosPrivate.get("/token");
        dispatch(setToken(response.data.token));
        return response.data.data;
    }
    return refresh;
}