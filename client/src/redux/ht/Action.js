import axios from 'axios';
import { MESSAGE, HOUSE_DETAILS, HOUSE_ID, } from '../constants';

export const setHouseDetails = (payload) => ({
    type: HOUSE_DETAILS,
    payload,
});

export const setMessage = (payload) => ({
    type: MESSAGE,
    payload,
});

export const setHouseId = (payload) => ({
    type: HOUSE_ID,
    payload,
});

const API_BASE_URL = 'http://localhost:8080'

// general server request
export const RequestsApi = async (method, url, body) => {
    const apiUrl = url ? `${API_BASE_URL}/${url}` : API_BASE_URL;

    let axiosConfig = {
        method,
        url: apiUrl,
    };
    if (method === 'GET') {
        axiosConfig = {
            ...axiosConfig,
            params: body,
        };
    } else {
        axiosConfig = {
            ...axiosConfig,
            data: body,
        };
    }
    return await axios(axiosConfig);
};

//add House
export const addHouse = (house, status) => async (dispatch) => {
    try {
        const response = await RequestsApi('POST', 'api/houses', house);
        dispatch(setHouseId(response?.data?.houseId));
        dispatch(getHouseDetails(status))
    } catch (error) {
        dispatch(setMessage(error?.response?.data?.message));
        status(false)
    }
};

//get House by id
export const getHouseDetails = (status) => async (dispatch, state) => {
    const houseId = state()?.VcReducers?.houseID
    try {
        const response = await RequestsApi('GET', `api/houses/${houseId}`);
        dispatch(setHouseDetails(response?.data?.houseDetails));
        status && status(true)
    } catch (error) {
        dispatch(setMessage(error?.response?.data?.message))
        status && status(false)
    }
};
//update House details by id
export const updateHouseDetails = (house, status) => async (dispatch, state) => {

    const houseId = state()?.VcReducers?.houseID
    try {
        await RequestsApi('PUT', `api/houses/${houseId}`, house);
        dispatch(getHouseDetails(status))
    } catch (error) {
        dispatch(setMessage(error?.response?.data?.message))
        status && status(false)
    }
};
