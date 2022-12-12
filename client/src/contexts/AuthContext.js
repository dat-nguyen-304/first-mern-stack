import { Children, createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    });

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = async () => {
        try {
            if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            }
            const response = await axios.get(`${apiUrl}/auth`);
            if (response.data && response.data.success) {
                dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true, user: response.data.user } });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } });
        }
    }

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const AuthContextData = { loginUser, authState };

    return (
        <AuthContext.Provider value={ AuthContextData }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;