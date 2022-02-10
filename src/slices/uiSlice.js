import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        FriendRequestWindow: false,
        OptionsWindow: false,
        EmojiWindow: false,
        chatActive: false
    },
    reducers:{
        windowToggle: (state,{payload})=>{   
            switch (payload) {
                case 'windowBell':
                    state.FriendRequestWindow ?
                    state.FriendRequestWindow = false :
                    state.FriendRequestWindow = true;
                break;
                case 'window3dots':
                    state.OptionsWindow ?
                    state.OptionsWindow = false :
                    state.OptionsWindow = true;
                break;
                case 'windowEmoji':
                    state.EmojiWindow ?
                    state.EmojiWindow = false :
                    state.EmojiWindow = true;
                break;
                default:
                    console.log('[ui]: window not found');
                break;
            }      
        },
        CloseAllWindowsExcept: (state,{payload})=>{
            switch (payload) {
                case 'windowBell':
                    state.OptionsWindow = false;
                    state.EmojiWindow = false;
                break;
                case 'window3dots':
                    state.FriendRequestWindow = false;
                    state.EmojiWindow = false;
                break;
                case 'windowEmoji':
                    state.FriendRequestWindow = false;
                    state.OptionsWindow = false;
                break;
                default:
                    console.log('[ui]: window not found');
                break;
            }      
        },
        closeAll:(state,action)=>{
            state = {};
        },
        setChatActive: (state,action)=>{
            state.chatActive = action.payload;
        }
    }
});

export const {
    windowToggle,
    CloseAllWindowsExcept,
    closeAll,
    setChatActive
} = uiSlice.actions; 

export default uiSlice.reducer;