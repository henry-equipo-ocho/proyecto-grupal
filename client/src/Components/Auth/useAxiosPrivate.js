import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/Actions/actions";
import { axiosPrivate } from "./axios";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {

    const refresh = useRefreshToken();
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(config => {

            if (!config.headers['Authorization'] && token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    dispatch(setToken(newAccessToken));
                    !localStorage.getItem('data') && localStorage.setItem('data', JSON.stringify(jwtDecode(newAccessToken)));
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh])

    return axiosPrivate;
};