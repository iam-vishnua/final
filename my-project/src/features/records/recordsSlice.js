import { createSlice } from '@reduxjs/toolkit';
export const recordsSlice = createSlice({
    name: 'records',
    initialState:{
        records:[],
    },
    reducers: {
         addRecords: (state, action) => {
        state.records= action.payload;
      },
      addOneRecord:(state,action)=>{
        state.records.push(action.payload)
      },
      deleteOneRecord: (state, action) => {
        // Use filter to create a new array without the deleted record
        state.records = state.records.filter(record => record._id !== action.payload);
      },
    },
    });



export const { addRecords,addOneRecord,deleteOneRecord } = recordsSlice.actions;

export default recordsSlice.reducer;