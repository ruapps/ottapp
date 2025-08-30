import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addLabel = createAsyncThunk("labelstate/add", async (item) => {
  const response = await axios.post(
    "http://localhost:8001/searchedlabels",
    item
  );
  return response.data;
});
const updateLabel = createAsyncThunk(
  "labelstate/update",
  async ({ id, item }) => {
    // console.log(obj);
    const response = await axios.patch(
      `http://localhost:8001/searchedlabels/${id}`,
      item
    );

    return response.data;
  }
);

export { addLabel, updateLabel };
