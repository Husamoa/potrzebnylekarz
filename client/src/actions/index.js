import axios from "axios";
import {FETCH_USER, REGISTER_USER} from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/current_user")

    dispatch({type: FETCH_USER, payload: res.data});
};

export const updateProfile = (data) => async dispatch => {
    const res = await axios.post("api/update_profile", data)

    dispatch({type: FETCH_USER, payload: res.data});
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({type: FETCH_USER, payload: res.data})
}

export const registerUser = (data) => async dispatch => {
    try {
        const res = await axios({
            method: "POST",
            url: '/api/register',
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            data: data,
        })
        dispatch({type: REGISTER_USER, payload: res.data.user})
    } catch (err) {
        throw new Error(err);
    }
}

export const loginUser = (data) => async dispatch => {
    try {
        const res = await axios({
            method: "POST",
            url: '/api/login',
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            data: data,
        })
        dispatch({type: REGISTER_USER, payload: res.data.user})
    } catch (err) {
        throw new Error(err.response.data.error);
    }
}