import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_REST_API_ENDPOINT;//"http://localhost:8000"

export const fetchAsyncLogin = createAsyncThunk(
    "login/post",
    async (auth) => {
        const res = await axios.post(`${apiUrl}/api/auth/`, auth, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    });

export const fetchAsyncRegister = createAsyncThunk(
    "register/post",
    async (auth) => {
        const res = await axios.post(`${apiUrl}/api/createuser/`, auth, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
);

export const fetchAsyncGetProfile = createAsyncThunk(
    "profile/get",
    async () => {
        const res = await axios.get(`${apiUrl}/api/userprofile/`, {
            headers: {
                Authorization: `token ${localStorage.token}`,
            },
        });
        return res.data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        profile: {
            id: 0,
            username: "",
        },
    },
    reducers: {},
    //後処理について記述
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token);
        });
        builder.addCase(fetchAsyncGetProfile.fulfilled, (state, action) => {
            return {
                ...state,
                profile: action.payload,
            };
        });
    },
});

export const selectProfile = (state) => state.auth.profile;

export default authSlice.reducer;