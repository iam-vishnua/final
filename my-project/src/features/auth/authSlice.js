import { createSlice } from '@reduxjs/toolkit'



export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user:null
  },
  reducers: {
    addUser:(state,action)=>{
        state.user=action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addUser } = authSlice.actions

export default authSlice.reducer