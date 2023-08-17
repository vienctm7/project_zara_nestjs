import axios from "axios";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  persons: any;
  users: any;
  error: string | undefined;
  isFetching: boolean;
  isSuccess: boolean
}

const initialState: UserState = {
  persons: [],
  users: [],
  error: "",
  isFetching: false,
  isSuccess: false
};

export const postPerson = createAsyncThunk(
  "user/post",async ({
    email,
    password,
    username,
    phoneNumber,
    address,
    gender,
    date_of_birth,
  }: {
    email: string;
    password: string;
    username: string;
    phoneNumber: string;
    address: string;
    gender: number;
    date_of_birth:string;
  }) => {
    try {
      const response = await axios
      .post("http://localhost:8000/api/v1/register", {
        email,
        password,
        username,
        phoneNumber,
        address,
        gender,
        date_of_birth,
      })
      console.log(response.data);
      return response.data.user;
    }  catch (error: any) {
      console.log("errorqq",error);
      throw new Error(error.response.data.message);
    }
    
  }
);

export const savePerson = createAsyncThunk(
  "user/save",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      console.log(email);
      
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        email,
        password,
      });
      console.log(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error: any) {
      console.log("errorqq",error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

export const resetPerson = createAsyncThunk("user/reset", () => {
  return;
});

export const PersonSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postPerson.pending, (state, action) =>{
      state.isFetching = true;
    })
    builder.addCase(postPerson.fulfilled, (state, action) => {
      state.persons.push(action.payload);
    });
    builder.addCase(postPerson.rejected, (state, action) =>{
      console.log("xxx",action);
      state.error = action.error.message
    
    })

    builder.addCase(savePerson.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(savePerson.fulfilled, (state, action) => {
      state.users.push(action.payload);
      console.log(action.payload);
      
    });

    builder.addCase(savePerson.rejected, (state, action) => {
      state.error = action.error.message;
      console.log();
      
    });

    builder.addCase(resetPerson.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = "";
    });
  },
});

export default PersonSlice.reducer;
