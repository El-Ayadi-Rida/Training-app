import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVICE_URL } from 'config.js';
import axios from 'axios';

const initialState = {
  contacts: [],
  pageCount: 0,
  pageIndex: 0,
  loading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    receiveService(state, action) {
      const { contacts, pageCount, loading } = action.payload;
      state.contacts = contacts;
      state.pageCount = pageCount;
      state.loading = loading;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
const { setLoading, receiveService } = contactsSlice.actions;

export const getContacts =
  ({ term, sortBy, pageSize, pageIndex }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const response = await axios.get(`http://localhost:8080/api/v1/program`, { params: { term, sortBy, pageSize, pageIndex } });
    const { items: contacts, pageCount } = response.data;
    dispatch(receiveService({ contacts, pageCount, loading: false, pageIndex }));
  };

export const createContact =
  ({ sortBy, pageSize, pageIndex, item }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const response = await axios.post(`${SERVICE_URL}/apps/contacts`, { sortBy, pageSize, pageIndex, item });
    const { items: contacts, pageCount } = response.data;
    dispatch(receiveService({ contacts, pageCount, loading: false, pageIndex }));
  };

export const updateContact =
  ({ sortBy, pageSize, pageIndex, item }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const response = await axios.put(`${SERVICE_URL}/apps/contacts`, { sortBy, pageSize, pageIndex, item });
    const { items: contacts, pageCount } = response.data;
    dispatch(receiveService({ contacts, pageCount, loading: false, pageIndex }));
  };
  
export const deleteContacts =
  ({ ids }) =>
  async (dispatch) => {
    console.log(ids);
    // const response = await axios.delete(`http://localhost:8080/api/v1/program`, { ids });
    // console.log(response);
  };
export const deleteContact =
(id) =>
async (dispatch) => {
  console.log(id);
  try {
    console.log(id);
    const response = await axios.delete(`http://localhost:8080/api/v1/program/${id}`);
    console.log(response);
    return id; // Return the deleted contact ID
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error; // Re-throw the error for potential global error handling
  }
};


// export const deleteContacta = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId) => {
//     try {
//       console.log(contactId);
//       const response = await axios.delete(`http://localhost:8080/api/v1/program/${contactId}`);
//       console.log(response);
//       return contactId; // Return the deleted contact ID
//     } catch (error) {
//       console.error('Error deleting contact:', error);
//       throw error; // Re-throw the error for potential global error handling
//     }
//   }
// );

const contactsReducer = contactsSlice.reducer;

export default contactsReducer;
