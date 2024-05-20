import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';


export const fetchPrograms = createAsyncThunk(
    'programs/fetchPrograms',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('/program');
        return response.data?.content;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// export const addProgram = createAsyncThunk(
//     'programs/addProgram',
//     async (program, { rejectWithValue }) => {
//         try {
//         const response = await api.post('/programs', program);
//         return response.data;
//         } catch (error) {
//         return rejectWithValue(error.response.data || error.message);
//         }
//     }
// );

const initialState = {
    programs:[],
    status:'IDLE',
    error:null
}

const programSlice = createSlice({
    name:'program',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(fetchPrograms.pending, (state) => {
            state.status = 'LOADING';
          })
          .addCase(fetchPrograms.fulfilled, (state, action) => {
            state.programs = action.payload;
            state.status = 'SUCCEED';
          })
          .addCase(fetchPrograms.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'FAILED';
          })
      }
});

export default programSlice.reducer;