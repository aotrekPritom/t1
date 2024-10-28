import { FieldValues } from "react-hook-form"

import { jwtDecode } from "jwt-decode";
import setAccessToken from "./setAccessToken";
import { TUser } from "@/redux/features/auth/authSlice";

export const loginUser = async (data: FieldValues) => {
    const res = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials:"include"
    })
    const userData = await res.json();
    if(userData?.data?.accessToken){
        setAccessToken(userData?.data?.accessToken)
    }
    return userData;
}