import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const addLabel = createAsyncThunk("labelstate/add", async (item) => {
  const response = await axios.post(`${BASE_URL}/searchedlabels`, item);
  return response.data;
});

const updateLabel = createAsyncThunk(
  "labelstate/update",
  async ({ id, item }) => {
    const response = await axios.patch(
      `${BASE_URL}/searchedlabels/${id}`,
      item
    );
    return response.data;
  }
);

export { addLabel, updateLabel };
