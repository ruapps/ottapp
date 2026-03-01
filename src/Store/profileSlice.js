import { createSlice } from "@reduxjs/toolkit";
import { updateProfile, fetchProfile } from "../Api/profileApi";

const profilecSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      _id: " ",
      bio: " ",
      phoneNumber: " ",
      location: " ",
      user: {
        _id: " ",
        fullName: " ",
        email: " ",
        userType: " ",
      },
    },
    error: [],
    loading: {
      update: "idle",
      fetch: "idle",
    },
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading.fetch = "pending";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading.fetch = "fulfilled";
        state.profile = action.payload;
        state.error = [];
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading.fetch = "rejected";
        state.error = action.payload?.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading.update = "pending";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading.update = "fulfilled";
        state.profile = action.payload;
        state.error = [];
      })
      .addCase(updateProfile.rejected, (state, action) => {
        if (action.payload.check) {
          const { oldInput } = action.payload;
          const { fullName, email, bio, phoneNumber, location } = oldInput;
          state.profile.user.fullName = fullName;
          state.profile.user.email = email;
          state.profile.bio = bio;
          state.profile.phoneNumber = phoneNumber;
          state.profile.location = location;
        }
        state.loading.update = "rejected";
        state.error = action.payload?.errors || action.payload?.message;
      });
  },
});

export default profilecSlice.reducer;
