import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import uiReducer from '../slices/uiSlice';
import chatReducer from '../slices/chatSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        ui: uiReducer,
        chat: chatReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;
