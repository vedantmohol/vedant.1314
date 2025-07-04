import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentPage: null,
    error : null,
    loading: false,
}

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        updatePageStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        updatePageSuccess: (state,action) =>{
            state.currentPage = action.payload,
            state.loading = false,
            state.error = null
        },
        updatePageFailure: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        }
    }
})

export const { updatePageStart, updatePageSuccess, updatePageFailure } = pageSlice.actions;

export default pageSlice.reducer;