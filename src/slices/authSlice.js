import {createSlice} from '@reduxjs/toolkit';
import { chatApp, chatAppToken } from '../helpers/axiosInstance';

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        session: null,
        checking: true
    },
    reducers: {
        setSessionInfo: (state,action)=>{
            state.session = action.payload;
        },
        setChecking: (state,action)=>{
            state.checking = action.payload;
        },
        purgeSession:(state)=>{
            state.session = null;
            state.checking = false;
            localStorage.clear();
        }
    }
});

export const {setSessionInfo,setChecking,purgeSession} = authSlice.actions;
export default authSlice.reducer;

//async actions

export const registerUser = ({values,form})=>{
    return async (dispatch)=>{
        try {

            const res = await chatApp.post('/auth/register', values);
            const json = res.data;

            if(json.ok){
                const {token,user} = json;
                localStorage.setItem('x-token-chatApp',token);
                dispatch(setSessionInfo(user));
                form.resetForm();
            }
            else{
                form.setFieldError('serverError',json.msg);
            }

        } catch (error) {
            console.error(error);
            form.setFieldError('serverError',error.message);
        }
    }
}

export const loginWithEmailAndPassword = ({values,form})=>{
    return async (dispatch)=>{
        try {
    
            const res = await chatApp.post('/auth',values);
            const json = res.data;

            if(json.ok){
                localStorage.setItem('x-token-chatApp',json.token);
                dispatch(setSessionInfo(json.user));
                form.resetForm();
            }
            else{
                form.setFieldError('currentErr',json.msg);
            }   
            
        } catch (error) {
            console.log(error);
            form.setFieldError('currentErr',error.message);
        }
    }
}

export const refreshToken = ()=>{
    return async (dispatch)=>{
        try {
    
            const res = await chatAppToken.get('/auth/refresh-token');
            const json = res.data;

            if(json.ok){
                localStorage.setItem('x-token-chatApp',json.token);
                dispatch(setSessionInfo(json.user));
                dispatch(setChecking(false));
            } 
            else{
                dispatch(purgeSession());
            }
            
        } catch (error) {
            console.error(error);
            dispatch(purgeSession());
        }
    }
}