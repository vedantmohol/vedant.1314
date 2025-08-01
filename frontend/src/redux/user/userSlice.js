import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser: null,
    error : null,
    loading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        signInSuccess: (state,action) =>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null;
        },
        signInFailure: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },
        updateStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        updateSuccess: (state,action) =>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        updateFailure: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },
        deleteStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state) =>{
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },
        deleteFailure: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },
        signOutSuccess: (state) =>{
            state.loading = false,
            state.error = null,
            state.currentUser = null
        }
    }
})

export const { signInStart, signInFailure, signInSuccess, updateStart, updateSuccess, updateFailure, deleteStart, deleteSuccess, deleteFailure, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;