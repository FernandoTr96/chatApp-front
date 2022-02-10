import {createSlice} from '@reduxjs/toolkit';
import { chatAppToken } from '../helpers/axiosInstance';
import { setChatActive } from './uiSlice';

const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        currentChat: {},
        messageIndicator: [],
        messageReceived: false
    },
    reducers:{
        setCurrentChat: (state,action)=>{
            state.currentChat = {
                ...action.payload
            };
        },
        setMessageIndicator: (state,action)=>{
            state.messageIndicator = action.payload;
        },
        setMessageReceived: (state,action)=>{
            state.messageReceived = action.payload;
        },
        purgeCurrentChat: (state,action)=>{
            state.currentChat = {};
        }
    }
});

export const {setCurrentChat,setMessageIndicator,setMessageReceived,purgeCurrentChat} = chatSlice.actions;
export default chatSlice.reducer;


export const getChat = (friendUID,registers)=>{
    return async (dispatch)=>{
        try {
            const response = await chatAppToken.get(`/chat/historial/${friendUID}/${registers}`);
            const json = response.data;
            if(json.ok){
                delete json.ok;
                dispatch(setCurrentChat(json));
                dispatch(setChatActive(true));
            }

        } catch (error) {
            console.log(error);
        }
    }
}