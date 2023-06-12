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
export const addHouse = (house, toggleDialog) => async (dispatch) => {

    try {
        const response = await RequestsApi('POST', 'api/houses', house);
        dispatch(setHouseId(response?.data?.houseId));
        toggleDialog && toggleDialog()
    } catch (error) {
        dispatch(setMessage(error?.response?.data?.message));
    }
};

//get House by id
export const getHouseDetails = (id, toggleDialog) => async (dispatch, state) => {

    const houseId = id ?? state()?.VcReducers?.houseID

    try {
        const response = await RequestsApi('GET', `api/houses/${houseId}`);
        dispatch(setHouseDetails(response?.data?.houseDetails));
        toggleDialog && toggleDialog()

    } catch (error) {

        dispatch(setMessage(error?.response?.data?.message))

    }
};
//update House details by id
export const updateHouseDetails = (house, toggleDialog) => async (dispatch, state) => {
    try {
        await RequestsApi('PUT', `api/houses/${house.id}`, house);
        toggleDialog()
    } catch (error) {
        dispatch(setMessage(error?.response?.data?.message))

    }
};
