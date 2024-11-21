"use client";

import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import axiosService from "@/utils/axios";
import { IInitialState, userLoginSuccess, userLogoutSuccess } from "@/store/slice/auth";
import { useDispatch, useSelector } from "react-redux";

// constant
export const initialState:IInitialState = {
  error: null,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const verifyToken = (serviceToken: string | null) => {
  if (!serviceToken) return false;
  const decoded: any = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

export const setSession = (serviceToken: string | null) => {
    if(serviceToken) {
        localStorage.setItem('accessToken', serviceToken);
    }else{
        localStorage.removeItem('accessToken');
    }
}


export async function userLogout() {
  localStorage.removeItem("accessToken");
}


// ==============================|| PROVIDER ||============================== //

const JWTProvider = () => {
  const dispatch = useDispatch();
  const {isInitialized} = useSelector((state:any) => state.auth);

  const path = usePathname();

  useEffect(() => {
    const init = async () => {
      const serviceToken = localStorage.getItem("accessToken");
      if (serviceToken && verifyToken(serviceToken)) {
        try {
          const res:any = await axiosService.get(`http://localhost:3001/auth/user-data`,);
          dispatch(userLoginSuccess(res.data.user));
        } catch {
          dispatch(userLogoutSuccess());
        }
      } else {
        dispatch(userLogoutSuccess());
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialized) {
    return <NextTopLoader />;
  }

  return;
};

export default JWTProvider;