import axios from "axios";

const URL = "http://localhost:8081/api";

const getAPI = async (endpoint) => {
    try{
        const response = await axios.get(`${URL}/${endpoint}`);
        return response.data;
    }
    catch (e) {
        console.error("Error: ", e );
        throw e;
    }
}

const postAPI = async (endpoint, data) => {
    try{
        const response = await axios.post(`${URL}/${endpoint}`, data);
        return response.data;
    }
    catch (e) {
        console.error("Error: ", e );
        throw e;
    }
}

const putAPI = async (endpoint, data) => {
    try{
        const response = await axios.put(`${URL}/${endpoint}`, data);
        return response.data;
    }
    catch (e) {
        console.error("Error: ", e );
        throw e;
    }
}

const deleteAPI = async (endpoint) => {
    try{
        const response = await axios.delete(`${URL}/${endpoint}`);
        return response.data;
    }
    catch (e) {
        console.error("Error: ", e );
        throw e;
    }
}

export {getAPI, postAPI, putAPI, deleteAPI};
